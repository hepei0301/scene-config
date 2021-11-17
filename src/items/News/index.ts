import type { ComponentOptions } from 'src/editor/type';
import News from './News';

export const newsOptions: ComponentOptions = {
  component: News,
  defaultSize: {
    width: 154,
    height: 44,
  },
  defaultData: {
    type: 'switch',
  },
};
