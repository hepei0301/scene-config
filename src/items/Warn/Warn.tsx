import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Cell } from '@antv/x6';
import FlowGraph from '@/pages/Graph';
import { caseOptions } from '../Case';
import { layout } from '@/expandItems/AddCase/index';
import styles from './index.less';

export interface WarnProps {
  type: 'warn';
  props: {
    id: string;
    name: string;
  };
}

export default function Warn(props: any) {
  const { graph } = FlowGraph;
  const node = props.node;
  const caseList = _.get(node, 'data.props.monitorParamList', []);

  const addCase = (item: any) => {
    const caseNode = graph.createNode({
      ...caseOptions.defaultSize,
      shape: 'ais-rect-port',
      component: <caseOptions.component />,
      data: {
        value: item,
        type: 'case',
        props: {
          type: _.get(node, 'data.group', ''),
          id: _.get(node, 'data.props.id'),
        },
      },
    });

    const createEdge = (source: Cell, target: Cell) => {
      return graph.createEdge({
        shape: 'edge',
        source: { cell: source.id },
        target: { cell: target.id },
      });
    };
    graph.freeze();

    graph.addCell([caseNode, createEdge(caseNode, node)]);

    node.addChild(caseNode);

    layout();
  };

  useEffect(() => {
    const nodes = graph.getNodes();
    if (_.find(nodes, { id: node.id }) && !_.get(node, 'data.initCom', false)) {
      caseList &&
        caseList.forEach((item) => {
          addCase(item);
        });
    }
  }, []);

  return (
    <div className={styles.test}>
      <div className={styles.line}></div>
      <div className={styles.parame}>#{_.get(node, 'data.props.name', '')}#</div>
    </div>
  );
}
