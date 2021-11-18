import { useState, useEffect } from 'react';
import { Input, Tooltip } from 'antd';
import _ from 'lodash';
import useAsync from '../../hooks/useAsync';
import { getDeviceList, getModelRuleList, getNullParamPage } from '../../services/dragService';
import WithState from '../../component/WithState';
import { buttonOptions } from '../../items/Button';
import { warnOptions } from '../../items/Warn';
import { deviceOptions } from '../../items/Device';
import { modelOptions } from '../../items/Model';
import { newsOptions } from '../../items/News';
import styles from './index.less';

const { Search } = Input;

interface parameProps {
  group?: 'in' | 'model' | 'warn' | 'switch';
  options?: any;
  props?: any;
}

export default function Detail({ panelDetail, down }: any) {
  const [value, setValue] = useState('');
  let listState: any = { loading: false, value: [] };
  let parame: parameProps = {};

  switch (panelDetail.type) {
    case 'in':
      listState = useAsync(() => getDeviceList({ name: value, currentPage: 1, pageSize: 10000 }), [value]);
      parame = {
        group: 'in',
        options: deviceOptions,
      };
      break;
    case 'model':
      listState = useAsync(() => getModelRuleList({ name: value }), [value]);
      parame = {
        group: 'model',
        options: modelOptions,
      };
      break;
    case 'warn':
      listState = useAsync(() => getNullParamPage({ name: value, currentPage: 1, pageSize: 10000 }), [value]);
      parame = {
        group: 'warn',
        options: warnOptions,
      };
      break;
    case 'switch':
      listState = { loading: false, value: panelDetail.children };
      parame = {
        group: 'switch',
        options: newsOptions,
      };
      break;
  }
  const list = _.get(listState, 'value', []);

  // const [list, setList] = useState(panelDetail.children);

  return (
    <>
      <div className={styles.search}>
        <Search placeholder="请输入关键词" enterButton size="middle" onBlur={(e) => setValue(e.target.value)} onSearch={(value) => setValue(value)} />
      </div>
      <div className={styles.itemBox}>
        <WithState {...listState} className={styles.card}>
          <div className={styles.itemDetail}>
            {list.map((v: { id: string; name?: string; ruleName: string }, i: number) => {
              return (
                <div className={styles.item} onMouseDown={(e) => down(e, { ...parame, props: v })} key={v.id + i}>
                  <Tooltip placement="topLeft" title={v.name || v.ruleName}>
                    {v.name || v.ruleName}
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </WithState>
      </div>
    </>
  );
}
