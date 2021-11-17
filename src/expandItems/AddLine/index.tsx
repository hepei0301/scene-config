import React, { useState, useEffect } from 'react';
import dagre from 'dagre';
import { Button, InputNumber, Tooltip } from 'antd';
import { Graph, Cell, Node, Color, Dom } from '@antv/x6';
// import BaseInput from '@/baseItems/BaseInput';
import { ArrowRightOutlined } from '@ant-design/icons';
import FlowGraph from '@/pages/Graph';
import styles from './index.less';

interface IineProps {
  color: 'warn' | 'success';
}

const caseList: string[] = ['case1', 'case2'];
const dir: string = 'LR';

const colorInfo = {
  warn: '#faad14',
  success: '#52c41a',
};

export default function AddCase({ color }: IineProps) {
  const { graph } = FlowGraph;
  let source: any = null;
  const [selectNode, setSelectNode] = useState<any>(null);

  const click = () => {
    console.log('包围', selectNode);
    if (selectNode) {
      selectNode.attr('body/magnet', true);
    }
  };

  useEffect(() => {
    graph.on('node:click', ({ cell }) => {
      console.log(888, cell);
      setSelectNode(cell);
    });
  }, []);

  useEffect(() => {
    graph.bindKey('Ctrl', () => {
      if (source) {
        console.log(6666555, source);
        source.attr('body/magnet', true);
      }
    });
  }, []);

  return (
    <div className={styles.connect} style={{ background: colorInfo[color] }} onClick={click}>
      <ArrowRightOutlined style={{ fontSize: 12, color: 'white', cursor: 'pointer' }} />
    </div>
  );
}
