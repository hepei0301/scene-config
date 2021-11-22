import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import { Cell, Node } from '@antv/x6';
import FlowGraph from '../../pages/Graph';
import './index.less';

export interface CaseListProps {
  name: '';
}

export interface NullCaseProps {
  value: CaseListProps;
}

const color = {
  model: '#722ed1',
  device: '#008dff',
  warn: '#eb2f96',
};

export default function NullCase(props: any) {
  const [bordered, setBordered] = useState(false);
  const [selectCell, setSelectCell] = useState<Cell | null>(null);
  const inputRef = React.useRef<any>(null);
  const { graph } = FlowGraph;
  const node = props.node;

  const [inputValue, setInputValue] = useState(_.get(node, 'data.value.key', ''));

  const onChange = (e: any) => {
    setInputValue(e.target.value);
    const data: any = selectCell!.getData();
    if (data?.value) {
      const newData = {
        ...data,
        value: {
          ...data.value,
          key: e.target.value,
        },
      };
      selectCell!.setData(newData);
    }
  };

  useEffect(() => {
    graph.on('node:click', ({ cell }) => {
      setSelectCell(cell);
    });
  }, [selectCell]);

  return (
    <div
      className="item-nullcase"
      onClick={(e) => {
        inputRef.current!.focus();
        setBordered(true);
      }}>
      <span className="item-nullcase-line" style={{ background: color[node.data.props.type] }}></span>
      <Input
        ref={inputRef}
        className="item-nullcase-parame"
        size="small"
        bordered={bordered}
        onBlur={(e) => {
          console.log(232132, e.target.value);
          setInputValue(e.target.value);
          setBordered(false);
        }}
        value={inputValue}
        onChange={onChange}
        onClick={() => setBordered(true)}
      />
    </div>
  );
}
