import React from 'react';
import AddCase from '../../expandItems/AddCase';
import './index.less';

export default function Device(props: any) {
  const node = props.node;
  const deviceProps = node.data.props;

  return (
    <div className="item-device">
      <div className="item-device-line"></div>
      <span style={{ margin: '0 30px 0 6px' }}>#{deviceProps.name}#</span>

      <AddCase caseList={deviceProps.datasourcePara} sourceData={{ id: deviceProps.id, type: 'device' }} />
    </div>
  );
}
