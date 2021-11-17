import React, { useState, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { Graph, Cell, Node, Color, Dom } from '@antv/x6';
import FlowGraph from '@/pages/Graph';
import styles from './index.less';

const { Option } = Select;
interface ICaseSelect {
  propsValue: string;
}

export default function CaseSelect({ propsValue }: ICaseSelect) {
  const [value, setValue] = useState(propsValue);
  const [defaultData, setDefaultData] = useState<any>(null);
  const [node, setNode] = useState<any>(null);
  const cellRef = useRef<Cell>();
  const onChange = (value: string) => {
    const data: object = cellRef.current!.getData();
    if (defaultData) {
      const newData = {
        ...data,
        defaultData: {
          ...defaultData,
          value: value,
        },
      };
      cellRef.current!.setData(newData);
    }
  };

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  useEffect(() => {
    const { graph } = FlowGraph;
    graph.on('node:mouseenter', ({ cell }) => {
      setDefaultData(cell.data.defaultData);
      cellRef.current = cell;
    });
  }, []);

  return (
    <Select className={styles.select} value={value} onMouseDown={(e) => e.stopPropagation()} onChange={onChange}>
      <Option value="case1">方案一</Option>
      <Option value="case2">方案二</Option>
      <Option value="case3">方案三</Option>
      <Option value="case4">方案四</Option>
    </Select>
  );
}
