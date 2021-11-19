import React, { useCallback, useState, useRef } from 'react';
import { Popover, Tag } from 'antd';
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd';
import { DatabaseFilled, ReadOutlined } from '@ant-design/icons';
import { DRAGGABLE_ALGO_COMPONENT } from '@/constants/graph';
import styles from './node-title.less';

interface Props {
  node: any;
  searchKey?: string;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

const InnerNodeTitle = (props: Props) => {
  const { node = {}, searchKey = '', connectDragPreview, connectDragSource } = props;
  const { name = '', isDir } = node;
  const [visible, setVisible] = useState<boolean>(false);
  const onMouseIn = useCallback(() => {
    setVisible(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div className={styles.nodeTitleWrapper}>
      {connectDragPreview(
        connectDragSource(
          <div className={styles.node}>
            <span className={styles.label}>{name}</span>
          </div>
        )
      )}
      {visible && (
        <Popover visible={true} title={name} placement="right" key="description">
          <a className={styles.doc}>
            <ReadOutlined /> 文档
          </a>
        </Popover>
      )}
    </div>
  );
};

export const NodeTitle = DragSource(
  'DRAGGABLE_ALGO_COMPONENT',
  {
    beginDrag: (props: Props) => ({
      component: props.node,
    }),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(InnerNodeTitle);
