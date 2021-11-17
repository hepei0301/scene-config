import { Graph, Addon, FunctionExt, Shape, Node, Platform, Dom, NodeView } from '@antv/x6';
import '@antv/x6-react-shape';
import './shape';
import { itemPanelGroup } from '@/items';
import '../GraphCommon/connector';
import CustomPort from '@/customPort';
import _ from 'lodash';

// 高亮
const magnetAvailabilityHighlighter = {
  name: 'stroke',
  args: {
    attrs: {
      fill: '#fff',
      stroke: '#47C769',
    },
  },
};

export default class FlowGraph {
  public static graph: Graph;
  private static stencil: Addon.Stencil;

  public static init() {
    const that = this;
    this.graph = new Graph({
      container: document.getElementById('container')!,
      //   width: 1000,
      //   height: 800,
      history: true,
      onPortRendered(args) {
        const contentSelectors = args.contentSelectors;
        const container = contentSelectors && contentSelectors.content;
        console.log(contentSelectors, '111: ', container, 'contentSelectors');
        if (container) {
          //   ReactDOM.render(
          //       <div className="my-port" />,
          //     container
          //   );
        }
      },
      //   grid: {
      //     size: 1,
      //     visible: true,
      //     type: 'dot',
      //     args: {
      //       color: '#a0a0a0', // 网格线/点颜色
      //       thickness: 1, // 网格线宽度/网点大小
      //     },
      //   },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        filter: ['groupNode'],
      },
      connecting: {
        highlight: true,
        snap: {
          radius: 100,
        },
        allowBlank: false,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            zIndex: 0,
          });
        },

        validateConnection({ sourceView, targetView, targetMagnet }) {
          if (!targetMagnet) {
            return false;
          }

          if (targetMagnet.getAttribute('port-group') !== 'in') {
            return false;
          }

          if (targetView) {
            const node = targetView.cell;
            if (node instanceof CustomPort) {
              const portId = targetMagnet.getAttribute('port');
              const usedInPorts = node.getUsedInPorts(that.graph);
              if (usedInPorts.find((port) => port && port.id === portId)) {
                return false;
              }
            }
          }

          return true;
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#47C769',
            },
          },
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
            },
          },
        },
      },
      //   snapline: true,
      //   history: true,
      //   clipboard: {
      //     enabled: true,
      //   },
      keyboard: {
        enabled: true,
      },
    });
    this.initGraphShape();
    this.initEvent();
    return this.graph;
  }

  private static initGraphShape() {
    const { graph } = this;
    const aa = sessionStorage.getItem('ant-data');
    const bb = aa ? JSON.parse(aa) : { cells: [] };
    let nodes: any[] = [];
    let edges: any[] = [];
    _.isArray(bb.cells) &&
      bb.cells.forEach((element: any) => {
        if (element.shape === 'ais-rect-port') {
          let option: any = null;
          itemPanelGroup.forEach((v) => {
            v.children.forEach((child) => {
              if (child.type === element.data.type) {
                option = child;
              }
            });
          });

          if (option) {
            console.log(555, option, option.options.component);
            const node = {
              ...element,
              data: {
                ...element.data,
                initCom: true,
              },
              component: <option.options.component />,
            };
            nodes.push(node);
          }
        } else {
          edges.push(element);
        }
      });
    this.graph.fromJSON({
      nodes,
      edges,
    });
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  private static initEvent() {
    const { graph } = this;
    const container = document.getElementById('container')!;
    container.style.width = '100%';
    console.log(10, container.style.width);
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
    this.showPorts(ports, false);
    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text') as string;
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement;
      if (elem == null) {
        return;
      }
      cell.attr('text/style/display', 'none');
      if (elem) {
        elem.style.display = '';
        elem.contentEditable = 'true';
        elem.innerText = oldText;
        elem.focus();
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText);
        cell.attr('text/style/display', '');
        elem.style.display = 'none';
        elem.contentEditable = 'false';
      };
      elem.addEventListener('blur', () => {
        onBlur();
        elem.removeEventListener('blur', onBlur);
      });
    });
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        this.showPorts(ports, true);
      }),
      500
    );
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
      this.showPorts(ports, false);
    });

    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation();
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const cells = node.getDescendants();
      cells.forEach((n) => {
        if (collapsed) {
          n.hide();
        } else {
          n.show();
        }
      });
    });

    graph.on('node:embedded', ({ cell }) => {
      if (cell.shape !== 'groupNode') {
        cell.toFront();
      }
    });

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    graph.on('edge:connected', ({ previousView, currentView }) => {
      if (previousView) {
        this.update(previousView as NodeView);
      }
      if (currentView) {
        this.update(currentView as NodeView);
      }
    });
  }

  private static update(view: NodeView) {
    const cell = view.cell;
    if (cell instanceof CustomPort) {
      cell.getInPorts().forEach((port) => {
        const portNode = view.findPortElem(port.id!, 'portBody');
        view.unhighlight(portNode, {
          highlighter: magnetAvailabilityHighlighter,
        });
      });
      cell.updateInPorts(this.graph);
    }
  }
}
