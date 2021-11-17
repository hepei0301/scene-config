import React, { useState, useEffect } from 'react';
import styles from './index.less';
import _ from 'lodash';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { itemPanelGroup } from '@/items';
import { Addon } from '@antv/x6';
import FlowGraph from '@/pages/Graph';
import RowFlex from '@/component/RowFlex';
import { Collapse } from 'antd';
import Detail from './detail';

const { Panel } = Collapse;

const color = {
  输入设备: '#2db7f5',
  规则模型: '#722ed1',
  开关调用: '#87d068',
  告警规则: '#eb2f96',
  输出设备: '#faad14',
};

export default function () {
  const { graph } = FlowGraph;

  const dnd = new Addon.Dnd({
    target: FlowGraph.graph,
  });

  const down = (e: Event, v: any) => {
    const node = graph.createNode({
      ...v.options.defaultSize,
      shape: 'ais-rect-port',
      component: <v.options.component />,
      data: { ...v.options.defaultData, props: v.props, group: v.group },
      // highlight: true,
    });
    dnd.start(node, e);
  };

  const header = (item: any) => {
    return (
      <RowFlex align="middle" className={styles.header}>
        <div className={styles.line} style={{ background: color[item.name] }} />
        <h1>{item.name}</h1>
      </RowFlex>
    );
  };

  return (
    <div className={styles.list}>
      <Collapse
        ghost
        defaultActiveKey={itemPanelGroup.map((v, i) => v.name)}
        expandIconPosition="right"
        expandIcon={(panelProps) => {
          return panelProps.isActive ? <UpOutlined /> : <DownOutlined />;
        }}>
        {itemPanelGroup.map((item, i) => (
          <Panel header={header(item)} key={item.name} className={styles.panel}>
            <Detail panelDetail={item} down={down} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
