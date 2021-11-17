import React, { useCallback } from 'react';
import { useModel } from 'umi';
import { Tree } from 'antd';
import { useMount } from 'ahooks';
import { FolderFilled, FolderOpenFilled } from '@ant-design/icons';
import { NodeTitle } from './node-title';
import ToolBar from './components/ToolBar';
import styles from './index.less';
import { PlusCircleOutlined, MinusCircleOutlined, StarTwoTone } from '@ant-design/icons';
import { itemPanelGroup } from '@/items';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const { DirectoryTree, TreeNode } = Tree;

const FolderIcon = ({ expanded }: { expanded: boolean }) => {
  return expanded ? <FolderOpenFilled /> : <FolderFilled />;
};

export const ComponentTree = () => {
  const { componentTreeNodes, loadComponentNodes } = useModel('guide-algo-component');
  console.log('1111', componentTreeNodes, loadComponentNodes);
  useMount(() => {
    loadComponentNodes();
  });

  const renderTree = useCallback((treeList: any[] = [], searchKey: string = '') => {
    return treeList.map((item) => {
      const { isDir, id, children } = item;
      const key = id.toString();
      const title = <NodeTitle node={item} searchKey={searchKey} />;

      if (isDir) {
        return (
          <TreeNode icon={FolderIcon} key={key} title={title} className={styles.treeFolder}>
            {renderTree(children, searchKey)}
          </TreeNode>
        );
      }

      return (
        <TreeNode
          isLeaf={true}
          key={key}
          icon={<span />}
          title={title}
          className={styles.treeNode}
        />
      );
    });
  }, []);

  const treeList = componentTreeNodes.filter((node) => node.status !== 4);

  return (
    <div className={styles.list}>
      {/* <DirectoryTree
        showIcon={true}
        selectable={false}
        autoExpandParent={true}
        className={styles.tree}
        defaultExpandedKeys={['recentlyUsed']}
      >
        {renderTree(treeList)}
      </DirectoryTree> */}
      <Collapse
        ghost
        expandIcon={(panelProps) => {
          return panelProps.isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />;
        }}>
        {itemPanelGroup.map((item) => (
          <Panel header={item.name} key={item.name}>
            {item.children.map((v) => {
              return <NodeTitle node={v} />;
            })}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
