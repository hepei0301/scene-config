import type { ComponentOptions } from 'src/editor/type';
import Device from './Device';

export const deviceOptions: ComponentOptions = {
  component: Device,
  defaultSize: {
    width: 154,
    height: 44,
  },
  defaultData: {
    type: 'device',
  },
};
