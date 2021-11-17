import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import _ from 'lodash';
import { Toolbar } from '@antv/x6-react-components';
import RowFlex from '@/component/RowFlex';
import FlowGraph from '../Graph';
import { DataUri } from '@antv/x6';
import { ClearOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import '@antv/x6-react-components/es/toolbar/style/index.css';

const Item = Toolbar.Item;
const Group = Toolbar.Group;

export default function () {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [des, setDes] = useState('');

  const copy = () => {
    const { graph } = FlowGraph;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  };

  const cut = () => {
    const { graph } = FlowGraph;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  };

  const paste = () => {
    const { graph } = FlowGraph;
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  };

  useEffect(() => {
    const { graph } = FlowGraph;
    const { history } = graph;
    setCanUndo(history.canUndo());
    setCanRedo(history.canRedo());
    history.on('change', () => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });

    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      graph.undo();
      if (history.canUndo()) {
        console.log(99299, history);
        history.undo();
      }
      return false;
    });
    graph.bindKey(['meta+shift+z', 'ctrl+y'], () => {
      if (history.canRedo()) {
        history.redo();
      }
      return false;
    });
    graph.bindKey(['meta+d', 'ctrl+d'], () => {
      graph.clearCells();
      return false;
    });
    graph.bindKey(['meta+s', 'ctrl+s'], () => {
      graph.toPNG((datauri: string) => {
        DataUri.downloadDataUri(datauri, 'chart.png');
      });
      return false;
    });
    graph.bindKey(['meta+p', 'ctrl+p'], () => {
      graph.printPreview();
      return false;
    });
    graph.bindKey(['meta+c', 'ctrl+c'], copy);
    graph.bindKey(['meta+v', 'ctrl+v'], paste);
    graph.bindKey(['meta+x', 'ctrl+x'], cut);
    graph.bindKey(['delete', 'backspace'], () => {
      const { graph } = FlowGraph;
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
      return false;
    });
  }, []);

  const handleClick = (name: string) => {
    const { graph } = FlowGraph;
    switch (name) {
      case 'undo':
        graph.undo();
        break;
      case 'redo':
        graph.history.redo();
        break;
      case 'delete':
        graph.clearCells();
        break;
      case 'save':
        message.destroy();
        // if (_.isEmpty(projectName)) {
        //   message.warn('请输入名称');
        //   return;
        // }
        const data = graph.toJSON();
        const formatData: any[] = [];
        console.log(99999, data);
        if (data.cells && Array.isArray(data.cells)) {
          data.cells.forEach((v) => {
            if (v.shape === 'ais-rect-port') {
              formatData.push({
                id: v.id,
                zIndex: v.zIndex,
                size: v.size,
                position: v.position,
                shape: v.shape,
                type: v?.type,
                data: v.data.defaultData,
              });
            } else {
              formatData.push(v);
            }
            // if (v.shape === 'edge') {
            //   formatData.push({
            //     id: v.id,
            //     zIndex: v.zIndex,
            //     shape: v.shape,
            //     data: v.attrs?.line,
            //     source: v.source,
            //     target: v.target,
            //   });
            // }
            // if (v.shape === 'org-edge') {
            //     formatData.push({
            //       id: v.id,
            //       zIndex: v.zIndex,
            //       shape: v.shape,
            //       data: v.attrs?.line,
            //       source: v.source,
            //       target: v.target,
            //     });
            //   }
          });
        }
        console.log(444, JSON.stringify(data));
        sessionStorage.setItem('ant-data', JSON.stringify(data));
        // graph.toPNG((datauri: string) => {
        //   DataUri.downloadDataUri(datauri, 'chart.png')
        // })
        break;
      case 'print':
        graph.printPreview();
        break;
      case 'copy':
        copy();
        break;
      case 'cut':
        cut();
        break;
      case 'paste':
        paste();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <Toolbar hoverEffect={true} size="small" onClick={handleClick}>
          <Group>
            <Item name="delete" icon={<ClearOutlined />} tooltip="清除 (Cmd + D, Ctrl + D)" />
          </Group>
          <Group>
            <Item name="undo" tooltip="撤销 (Cmd + Z, Ctrl + Z)" icon={<UndoOutlined />} />
          </Group>
          <Group>
            <Item name="save" icon={<SaveOutlined />} tooltip="保存 (Cmd + S, Ctrl + S)" />
          </Group>
        </Toolbar>
      </div>
      <RowFlex align="middle">
        <p>
          <b style={{ color: 'red' }}>*&nbsp;</b>名称
        </p>
        <Input
          placeholder="请输入"
          size="small"
          style={{ width: 130, marginRight: 50, marginLeft: 10 }}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <p>配置描述</p>
        <Input
          placeholder="请输入"
          size="small"
          style={{ width: 200, marginRight: 20, marginLeft: 10 }}
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </RowFlex>
    </>
  );
}
