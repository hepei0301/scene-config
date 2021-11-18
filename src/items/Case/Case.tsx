import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { CaseListProps } from '../../expandItems/AddCase';
import styles from './index.less';
export interface CaseProps {
  value: CaseListProps;
}

const color = {
  model: '#722ed1',
  device: '#008dff',
  warn: '#eb2f96',
};

export default function Case(props: any) {
  const node = props.node;
  let name: string = '';
  switch (node.data.props.type) {
    case 'device':
      name = _.get(node, 'data.value.parameterName', '');
      break;
    case 'model':
      name = _.get(node, 'data.value.parameterName', '');
      break;
    default:
      name = _.get(node, 'data.value.name', '');
      break;
  }

  return (
    <div className={styles.test}>
      <span className={styles.line} style={{ background: color[node.data.props.type] }}></span>
      <div className={styles.parame}>#{name}#</div>
    </div>
  );
}
