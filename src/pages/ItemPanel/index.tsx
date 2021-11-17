import React from 'react';
import classNames from 'classnames';
import { ComponentTree } from './component-tree';
import styles from './index.less';

interface Props {
  className?: string;
}

export const ItemPanel: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <div className={classNames(className, styles.componentSourceTree)}>
      <div className={styles.component}>
        <ComponentTree />
      </div>
      <div className={styles.links} />
    </div>
  );
};
