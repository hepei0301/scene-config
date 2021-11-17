import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Row, Col, Input, Slider } from 'antd';
import FlowGraph from '@/pages/Graph';
import { Cell } from '@antv/x6';
import DetailPanelContainer from './DetailPanelContainer';
import DetailPanelDefault from './DetailPanelDefault';
import type { PanelChangeHandler } from './Helpers';
import { getComponent } from '@/editor/componentUtil';
import type {
  ComponentOptions,
  ComponentEditableData,
  ComponentData,
  CompositeData,
} from '@/editor/type';

export interface DetailPanelContainerProps<T = any> {
  data: T;
  path: string | null;
  detailPanel: any;
}
const { TabPane } = Tabs;

interface IProps {
  id: string;
}
interface NodeAttrs {
  stroke: string;
  strokeWidth: number;
  fill: string;
  fontSize: number;
  color: string;
}

export default function (props: IProps) {
  const { id } = props;
  const { graph } = FlowGraph;
  const [setAttr, setAttrs] = useState({});
  const [detailPanel, setDetailPanel] = useState([]);
  const [defaultData, setDefaultData] = useState(null);
  const cellRef = useRef<Cell>();

  useEffect(() => {
    if (id) {
      const cell = graph.getCellById(id);
      if (!cell || !cell.isNode()) {
        return;
      }
      setDetailPanel(cell.data.detailPanel);
      //   const { detailPanel } = getComponent(cell?.type) as ComponentOptions;
      setDefaultData(cell.data.defaultData);
      console.log('设置属性节点---》', cell);
      cellRef.current = cell;
      //   setAttrs({
      //     stroke: cell.attr('body/stroke'),
      //     strokeWidth: cell.attr('body/strokeWidth'),
      //     fill: cell.attr('body/fill'),
      //     fontSize: cell.attr('text/fontSize'),
      //     color: cell.attr('text/fill'),
      //   });
    }
  }, [id]);

  const handleChange: PanelChangeHandler = ({ prop, value, history = true }) => {
    setDefaultData((prev) => ({
      ...prev,
      [prop]: value,
    }));

    console.log(prop, value);
  };

  useEffect(() => {
    if (defaultData) {
      const data: object = cellRef.current!.getData();
      const newData = { ...data, defaultData };
      console.log(8888, newData, defaultData, cellRef);
      cellRef.current!.setData(newData);
      // FlowGraph.updateExperimentGraph([defaultData])
    }
    // defaultData && cellRef.current!.data('defaultData', defaultData)
  }, [defaultData]);

  console.log(1111, defaultData, detailPanel);

  return (
    <div>
      {Array.isArray(detailPanel) ? (
        <DetailPanelDefault data={defaultData} groups={detailPanel} onChange={handleChange} />
      ) : (
        React.createElement(detailPanel, {
          defaultData,
          onChange: handleChange,
        })
      )}
    </div>
  );
}
