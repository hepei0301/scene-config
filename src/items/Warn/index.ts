import type { ComponentOptions } from 'src/editor/type';
import Warn, { WarnProps } from './Warn';

export const warnOptions: ComponentOptions<WarnProps> = {
  component: Warn,
  defaultSize: {
    width: 154,
    height: 44,
  },
  defaultData: {
    type: 'warn',
    props: {
      id: '',
      name: '',
    },
  },
};
