import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import FlowGraph from './Graph';
import ToolBar from './ToolBar';
import TreePanel from './TreePanel';
import '../reset.less';
import '../global.less';
import './index.less';

export default function Scene(props: any) {
  const { sourceData, goBack } = props;
  const [isReady, setIsReady] = useState(false);

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 581,
      height: document.body.offsetHeight - 87,
    };
  };

  useEffect(() => {
    const graph = FlowGraph.init(sourceData);
    setIsReady(true);

    const resizeFn = () => {
      const { width, height } = getContainerSize();
      graph.resize(width, height);
    };
    resizeFn();

    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  return (
    <div className="scene-wrap" style={{ pointerEvents: sourceData.type !== 'view' ? 'auto' : 'none' }}>
      <div className="scene-header">
        <span>应用场景配置</span>
        <Button
          onClick={() => {
            goBack && goBack();
          }}>
          返回
        </Button>
      </div>
      <div className="scene-content">
        <div className="scene-sider">
          <TreePanel {...props} />
        </div>
        <div className="scene-panel">
          <div className="scene-toolbar">{isReady && sourceData.type !== 'view' && <ToolBar {...props} />}</div>
          <div id="container" className="scene-container" />
        </div>
      </div>
    </div>
  );
}
