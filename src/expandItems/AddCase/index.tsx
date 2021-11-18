import React, { useState, useEffect } from 'react';
import dagre from 'dagre';
import { Button, Tooltip } from 'antd';
import { Cell, Node } from '@antv/x6';
import { PlusCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import FlowGraph from '../../pages/Graph';
import { caseOptions } from '../../items/Case';
import styles from './index.less';

export interface CaseListProps {
  parameterKey?: string;
  parameterName: string;
}
interface AddCaseProps {
  caseList: CaseListProps[];
  sourceData: {
    id: string | number;
    type: 'device';
  };
}

const dir: string = 'LR';

export const layout = () => {
  const { graph } = FlowGraph;
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: dir, nodesep: 16, ranksep: 16 });
  g.setDefaultEdgeLabel(() => ({}));

  const width = 260;
  const height = 90;
  nodes.forEach((node) => {
    g.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    const source = edge.getSource();
    const target = edge.getTarget();
    g.setEdge(source.cell, target.cell);
  });

  dagre.layout(g);

  graph.freeze();

  g.nodes().forEach((id) => {
    const node = graph.getCell(id) as Node;
    if (node) {
      const pos = g.node(id);
      node.position(pos.x, pos.y);
    }
  });

  edges.forEach((edge) => {
    const source = edge.getSourceNode()!;
    const target = edge.getTargetNode()!;
    const sourceBBox = source.getBBox();
    const targetBBox = target.getBBox();

    if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
      const gap = dir === 'LR' ? targetBBox.x - sourceBBox.x - sourceBBox.width : -sourceBBox.x + targetBBox.x + targetBBox.width;
      const fix = dir === 'LR' ? sourceBBox.width : 0;
      const x = sourceBBox.x + fix + gap / 2;
      edge.setVertices([
        { x, y: sourceBBox.center.y },
        { x, y: targetBBox.center.y },
      ]);
    } else if ((dir === 'TB' || dir === 'BT') && sourceBBox.x !== targetBBox.x) {
      const gap = dir === 'TB' ? targetBBox.y - sourceBBox.y - sourceBBox.height : -sourceBBox.y + targetBBox.y + targetBBox.height;
      const fix = dir === 'TB' ? sourceBBox.height : 0;
      const y = sourceBBox.y + fix + gap / 2;
      edge.setVertices([
        { x: sourceBBox.center.x, y },
        { x: targetBBox.center.x, y },
      ]);
    } else {
      edge.setVertices([]);
    }
  });

  graph.unfreeze();
};

export default function AddCase({ caseList = [], sourceData }: AddCaseProps) {
  const { graph } = FlowGraph;
  const [selectCell, setSelectCell] = useState<Cell | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    graph.on('node:click', ({ cell }) => {
      setSelectCell(cell);
    });
  }, []);

  const click = (v: string) => {
    setVisible(false);
    const caseNode = graph.createNode({
      ...caseOptions.defaultSize,
      shape: 'ais-rect-port',
      component: <caseOptions.component />,
      data: { value: v, type: 'case', props: sourceData },
    });

    if (selectCell) {
      const createEdge = (source: Cell, target: Cell) => {
        return graph.createEdge({
          shape: 'edge',
          source: { cell: source.id },
          target: { cell: target.id },
        });
      };
      graph.freeze();

      graph.addCell([caseNode, createEdge(selectCell, caseNode)]);

      selectCell.addChild(caseNode);

      layout();
    }
  };

  return (
    <Tooltip
      placement="rightTop"
      color="#EBE2D6"
      trigger="hover"
      visible={visible}
      overlayClassName={styles.tip}
      title={
        <div className={styles.case}>
          {_.isArray(caseList) &&
            caseList.map((v, i) => {
              return (
                <Button shape="round" size="small" onClick={() => click(v)} key={i + v.parameterKey}>
                  {v.parameterName}
                </Button>
              );
            })}
        </div>
      }>
      {_.isArray(caseList) && !_.isEmpty(caseList) && (
        <PlusCircleOutlined style={{ fontSize: 18, color: '#008dff', cursor: 'pointer' }} onClick={() => setVisible(!visible)} />
      )}
    </Tooltip>
  );
}
