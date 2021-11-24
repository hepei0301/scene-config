import React, { useState, useEffect } from 'react';
import { Input, Tooltip } from 'antd';
import _ from 'lodash';
import useAsync from '../../hooks/useAsync';
// import { getDevice, getModelRule, getNullParam } from '../../services/dragService';
import WithState from '../../component/WithState';
import { buttonOptions } from '../../items/Button';
import { warnOptions } from '../../items/Warn';
import { deviceOptions } from '../../items/Device';
import { modelOptions } from '../../items/Model';
import { newsOptions } from '../../items/News';
import './detail.less';

const { Search } = Input;

interface parameProps {
  group?: 'in' | 'model' | 'warn' | 'switch';
  options?: any;
  props?: any;
}

export default function Detail({ panelDetail, down, getDeviceList, getModelRuleList, getNullParamPage }: any) {
  const [value, setValue] = useState('');
  let listState: any = { loading: false, value: [] };
  let parame: parameProps = {};

  switch (panelDetail.type) {
    case 'in':
      if (getDeviceList) {
        listState = useAsync(() => getDeviceList({ name: value, currentPage: 1, pageSize: 10000 }), [value]);
      }
      parame = {
        group: 'in',
        options: deviceOptions,
      };
      break;
    case 'model':
      if (getModelRuleList) {
        listState = useAsync(() => getModelRuleList({ ruleName: value }), [value]);
      }
      parame = {
        group: 'model',
        options: modelOptions,
      };
      break;
    case 'warn':
      if (getNullParamPage) {
        listState = useAsync(() => getNullParamPage({ name: value, currentPage: 1, pageSize: 10000 }), [value]);
      }
      parame = {
        group: 'warn',
        options: warnOptions,
      };
      break;
    case 'switch':
      listState = { loading: false, value: { data: panelDetail.children } };
      parame = {
        group: 'switch',
        options: newsOptions,
      };
      break;
  }
  const list = _.get(listState, 'value.data', []);

  // const [list, setList] = useState(panelDetail.children);

  return (
    <>
      <div className="treepanel-detail-search">
        <Search placeholder="请输入关键词" enterButton size="middle" onBlur={(e) => setValue(e.target.value)} onSearch={(value) => setValue(value)} />
      </div>
      <div>
        <WithState {...listState} className="treepanel-detail-card">
          <div className="treepanel-detail-itemDetail">
            {_.isArray(list) &&
              list.map((v: { id: string; name?: string; ruleName: string }, i: number) => {
                return (
                  <div className="treepanel-detail-item" onMouseDown={(e) => down(e, { ...parame, props: v })} key={v.id + i}>
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
