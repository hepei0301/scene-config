import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { CaseListProps } from '@/expandItems/AddCase';
import styles from './index.less';
export interface CaseProps {
  value: CaseListProps;
}

export default function Case(props: any) {
  const node = props.node;

  return (
    <div className={styles.test}>
      <span className={styles.line}></span>
      <div className={styles.parame}>#{_.get(node, 'data.value.parameterName', '')}#</div>
    </div>
  );
}
