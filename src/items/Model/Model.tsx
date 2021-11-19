import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Cell } from '@antv/x6';
import FlowGraph from '../../pages/Graph';
import { caseOptions } from '../Case';
import { layout } from '../../expandItems/AddCase/index';
import './index.less';

export interface ModelProps {
  type: 'model';
  props: {
    id: string;
    ruleName: string;
  };
}

export default function Model(props: any) {
  const { graph } = FlowGraph;
  const node = props.node;
  const caseList = _.get(node, 'data.props.paramList', []);

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
    <div className="item-model">
      <div className="item-model-line"></div>
      <div className="item-model-parame">#{_.get(node, 'data.props.ruleName', '')}#</div>
    </div>
  );
}
