import React, { useState, useEffect, useRef } from 'react';
import { Button, InputNumber, Tooltip } from 'antd';
import { Graph, Cell, Node, Color, Dom } from '@antv/x6';
// import BaseInput from '@/baseItems/BaseInput';
import { PlusCircleOutlined } from '@ant-design/icons';
import FlowGraph from '@/pages/Graph';
import { TimePicker } from 'antd';
import moment from 'moment';
import RowFlex from '@/component/RowFlex';
import styles from './index.less';

const caseList: string[] = ['case1', 'case2'];
const dir: string = 'LR';

export default function TimeSwitch() {
  return (
    <div>
      <RowFlex align="middle" justify="center" className={styles.timeSwitch}>
        <span>开&nbsp;</span>
        <TimePicker
          defaultValue={moment('12:08:23', 'HH:mm:ss')}
          size="small"
          onMouseDown={(e) => e.stopPropagation()}
        />
        <span>&nbsp;后开</span>
      </RowFlex>
      <RowFlex align="middle" justify="center" className={styles.timeSwitch}>
        <span>关&nbsp;</span>
        <TimePicker
          defaultValue={moment('12:08:23', 'HH:mm:ss')}
          size="small"
          onMouseDown={(e) => e.stopPropagation()}
        />
        <span>&nbsp;后关</span>
      </RowFlex>
    </div>
  );
}
