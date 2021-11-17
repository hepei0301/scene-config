import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Tooltip } from 'antd';
import { Graph, Cell, Node, Color, Dom } from '@antv/x6';
// import BaseInput from '@/baseItems/BaseInput';
import AddCase from '@/expandItems/AddCase';
import { PlusCircleOutlined } from '@ant-design/icons';
import FlowGraph from '@/pages/Graph';
import styles from './index.less';

export interface InputProps {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  color: string;
  placeholder: string;
  value: string;
}

const caseList: string[] = ['case1', 'case2'];

export default function Warn(props: any) {
  //   const [selectId, setSelectId] = useState('');
  const { graph } = FlowGraph;
  const defaultData = props.data.props;

  const createEdge = (target: Cell) => {
    return graph.createEdge({
      shape: 'edge',
      source: { cell: selectId },
      target: { cell: target.id },
    });
  };
  const click = (e: any) => {
    e.stopPropagation();
    const member = graph.createNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'html',
      html() {
        const wrap = document.createElement('div');
        wrap.style.width = '100%';
        wrap.style.height = '100%';
        wrap.style.background = '#f0f0f0';
        wrap.style.display = 'flex';
        wrap.style.justifyContent = 'center';
        wrap.style.alignItems = 'center';

        wrap.innerText = 'Hello';

        return wrap;
      },
    });
    graph.freeze();
    graph.addCell([member, createEdge(member)]);
  };

  return (
    <div className={styles.test}>
      <div className={styles.line}></div>
      <span style={{ margin: '0 30px 0 6px' }}>#报警器#</span>
    </div>
  );
}
