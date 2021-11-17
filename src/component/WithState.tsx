import React, { forwardRef } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import type { SpinProps } from 'antd/lib/spin';
import EmptyBlock, { EmptyBlockProps } from './EmptyBlock';
import ErrorBoundary from './ErrorBoundary';
import './WithState.less';

export interface WithStateProps extends React.HTMLAttributes<HTMLElement> {
  loading: boolean;
  error?: Error;
  renderError?: (err: Error) => React.ReactNode;
  children?: React.ReactNode;
  isEmpty?: (value: any) => boolean;
  empty?: EmptyBlockProps;
  value?: any;
  spin?: SpinProps;
}

const isDefaultEmpty = (value: any) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

function WithState(props: WithStateProps, ref: React.RefObject<HTMLDivElement>) {
  const { error, loading, children, isEmpty = isDefaultEmpty, empty, value, className, spin, renderError, ...restProps } = props;

  const placeholder = !loading && isEmpty(value || children) && <EmptyBlock {...empty} />;
  const classes = classNames('with-state-container', className);

  return (
    <div className={classes} ref={ref} {...restProps}>
      <ErrorBoundary error={error} renderError={renderError} style={{ width: '100%' }}>
        <Spin delay={200} tip="玩命加载中..." {...spin} spinning={loading}>
          {placeholder || children || <span></span>}
        </Spin>
      </ErrorBoundary>
    </div>
  );
}

export default forwardRef(WithState);
