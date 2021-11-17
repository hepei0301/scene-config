import React from 'react';
import RowFlex from './RowFlex';

interface ErrorBoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: Error;
  renderError?: (err: Error) => React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  static getDerivedStateFromError(error: Error) {
    return { appError: error };
  }

  static defaultProps = {
    renderError(err: Error) {
      return (
        <span
          style={{
            fontSize: 14,
            color: '#f5222d',
          }}>
          {`: ( ${err.message || '加载失败'}`}
        </span>
      );
    },
  };

  constructor(props: any) {
    super(props);
    this.state = {
      appError: undefined,
    };
  }

  public render() {
    const { appError } = this.state;
    const { error, renderError, children, ...rest } = this.props;
    const err = appError || error;
    if (err) {
      return (
        <RowFlex column align="middle" justify="center" {...rest}>
          {renderError && renderError(err)}
        </RowFlex>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
