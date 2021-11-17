import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Tooltip } from 'antd';
import { Graph, Cell, Node, Color, Dom } from '@antv/x6';
import TimeSwitch from '@/expandItems/TimeSwitch';
import AddCase from '@/expandItems/AddCase';
import AddLine from '@/expandItems/AddLine';
import { PlusCircleOutlined } from '@ant-design/icons';
import FlowGraph from '@/pages/Graph';
import RowFlex from '@/component/RowFlex';
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

export default function Times(props: any) {
  return (
    <div className={styles.test}>
      <RowFlex align="middle" style={{ width: '100%' }}>
        <div className={styles.line} style={{ marginLeft: 20 }}></div>
        <span style={{ margin: '0 50px 0 6px' }}>#定时开关#</span>
        <AddLine color={'warn'} />
      </RowFlex>
      <TimeSwitch />
    </div>
  );
}
