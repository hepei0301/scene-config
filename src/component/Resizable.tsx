import React from 'react';
import { rafThrottle } from 'src/utils/rafThrottle';

export interface ResiableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  defaultHorizontalPercentage?: number;
}

interface ResiableState {
  horizontalPercentage: number;
}

export default class Resiable extends React.Component<ResiableProps, ResiableState> {
  constructor(props: ResiableProps) {
    super(props);
    this.state = {
      horizontalPercentage: props.defaultHorizontalPercentage || 0.15,
    };
  }

  dragging = false;

  x = 0;

  width = 0;

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX } = evt;
    const wrapper = currentTarget.parentElement!.parentElement!;
    const width = wrapper.offsetWidth;

    this.x = clientX;
    this.width = width;
    this.dragging = true;
    document.body.style.userSelect = 'none';

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = rafThrottle((evt: MouseEvent) => {
    const { clientX } = evt;
    if (!this.dragging) {
      return;
    }
    const deltaX = clientX - this.x;
    this.x = clientX;
    this.setState((prev) => {
      return {
        horizontalPercentage: prev.horizontalPercentage + deltaX / this.width,
      };
    });
  });

  handleMouseUp = () => {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  render() {
    const { children, style } = this.props;
    const { horizontalPercentage } = this.state;

    let value = horizontalPercentage;
    if (value > 0.9) {
      value = 0.9;
    } else if (value < 0.1) {
      value = 0.1;
    }

    return (
      <div style={{ position: 'relative', overflow: 'hidden', flex: `0 0 ${value * 100}%`, ...style }}>
        {children}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -2,
            width: 5,
            height: '100%',
            cursor: 'ew-resize',
          }}
          onMouseDown={this.handleMouseDown}></div>
      </div>
    );
  }
}
