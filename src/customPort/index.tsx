import { Graph, Edge, Shape, Node } from '@antv/x6';
import { ReactShape } from '@antv/x6-react-shape';
import { itemPanelGroup } from '@/items';
class CustomPort extends ReactShape {
  getInPorts() {
    return this.getPortsByGroup('in');
  }

  getOutPorts() {
    return this.getPortsByGroup('out');
  }

  getUsedInPorts(graph: Graph) {
    const incomingEdges = graph.getIncomingEdges(this) || [];
    return incomingEdges.map((edge: Edge) => {
      const portId = edge.getTargetPortId();
      return this.getPort(portId!);
    });
  }

  getNewInPorts(length: number) {
    return Array.from(
      {
        length,
      },
      () => {
        return {
          group: 'in',
        };
      }
    );
  }

  updateInPorts(graph: Graph) {
    const minNumberOfPorts = 2;
    const ports = this.getInPorts();
    const usedPorts = this.getUsedInPorts(graph);
    const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

    if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
      // noop
    } else if (ports.length === usedPorts.length) {
      //   this.addPorts(newPorts);
    } else if (ports.length + 1 > usedPorts.length) {
      this.prop(['ports', 'items'], this.getOutPorts().concat(usedPorts).concat(newPorts), {
        rewrite: true,
      });
    }

    return this;
  }
}

Node.registry.register('ais-rect-port', CustomPort);

CustomPort.config({
  //   ...itemPanelGroup[0].children[1].options.defaultSize,
  shape: 'ais-rect-port',
  //   component: itemPanelGroup[0].children[1].options.component,
  //   data: itemPanelGroup[0].children[1].options,
  highlight: true,
  ports: {
    items: [
      {
        group: 'in',
      },
      {
        group: 'out',
      },
    ],
    groups: {
      in: {
        position: {
          name: 'left',
        },
        attrs: {
          portBody: {
            magnet: 'passive',
            r: 3,
            stroke: '#ffa940',
            fill: '#fff',
            strokeWidth: 1,
          },
        },
      },
      out: {
        position: {
          name: 'right',
        },
        attrs: {
          portBody: {
            magnet: true,
            r: 3,
            fill: '#fff',
            stroke: '#3199FF',
            strokeWidth: 1,
          },
        },
      },
    },
  },
  portMarkup: [
    {
      tagName: 'circle',
      selector: 'portBody',
    },
  ],
});

export default CustomPort;

// import { Graph, Edge, Shape, Node } from '@antv/x6';
// import { ReactShape } from '@antv/x6-react-shape';
// import { itemPanelGroup } from '@/items';

// class CustomPort extends ReactShape {
//   getInPorts() {
//     return this.getPortsByGroup('in');
//   }

//   getOutPorts() {
//     return this.getPortsByGroup('out');
//   }

//   getUsedInPorts(graph: Graph) {
//     const incomingEdges = graph.getIncomingEdges(this) || [];
//     return incomingEdges.map((edge: Edge) => {
//       const portId = edge.getTargetPortId();
//       return this.getPort(portId!);
//     });
//   }

//   getNewInPorts(length: number) {
//     return Array.from(
//       {
//         length,
//       },
//       () => {
//         return {
//           group: 'in',
//         };
//       }
//     );
//   }

//   updateInPorts(graph: Graph) {
//     const minNumberOfPorts = 2;
//     const ports = this.getInPorts();
//     const usedPorts = this.getUsedInPorts(graph);
//     const newPorts = this.getNewInPorts(Math.max(minNumberOfPorts - usedPorts.length, 1));

//     if (ports.length === minNumberOfPorts && ports.length - usedPorts.length > 0) {
//       // noop
//     } else if (ports.length === usedPorts.length) {
//       this.addPorts(newPorts);
//     } else if (ports.length + 1 > usedPorts.length) {
//       this.prop(['ports', 'items'], this.getOutPorts().concat(usedPorts).concat(newPorts), {
//         rewrite: true,
//       });
//     }

//     return this;
//   }
// }

// Node.registry.register('ais-rect-port', CustomPort);

// CustomPort.config({
// //   ...itemPanelGroup[0].children[1].options.defaultSize,
//   shape: 'ais-rect-port',
// //   component: itemPanelGroup[0].children[1].options.component,
// //   data: itemPanelGroup[0].children[1].options,
//   highlight: true,
//   ports: {
//     items: [
//       {
//         group: 'out',
//       },
//     ],
//     groups: {
//       in: {
//         position: {
//           name: 'top',
//         },
//         attrs: {
//           portBody: {
//             magnet: 'passive',
//             r: 3,
//             stroke: '#ffa940',
//             fill: '#fff',
//             strokeWidth: 1,
//           },
//         },
//       },
//       out: {
//         position: {
//           name: 'bottom',
//         },
//         attrs: {
//           portBody: {
//             magnet: true,
//             r: 3,
//             fill: '#fff',
//             stroke: '#3199FF',
//             strokeWidth: 1,
//           },
//         },
//       },
//     },
//   },
//   portMarkup: [
//     {
//       tagName: 'circle',
//       selector: 'portBody',
//     },
//   ],
// });

// export default CustomPort;
