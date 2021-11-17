import { useState, useEffect } from 'react';
import { Button } from 'antd';
import FlowGraph from './Graph';
import ToolBar from './ToolBar';
import TreePanel from './TreePanel';
import '../reset.less';
import '../global.less';
import styles from './index.less';

export default function Scene () {
  const [isReady, setIsReady] = useState(false);

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 581,
      height: document.body.offsetHeight - 87,
    };
  };

  useEffect(() => {
    const graph = FlowGraph.init();
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
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span>应用场景配置</span>
        <Button size="middle" onClick={() => console.log('我现在要返回界面去了啊')}>
          返回
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.sider}>
          <TreePanel />
        </div>
        <div className={styles.panel}>
          <div className={styles.toolbar}>{isReady && <ToolBar />}</div>
          <div id="container" className={styles.container} />
        </div>
      </div>
    </div>
  );
}
