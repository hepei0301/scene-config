import type { ComponentOptions } from 'src/editor/type';
import Model, { ModelProps } from './Model';

export const modelOptions: ComponentOptions<ModelProps> = {
  component: Model,
  defaultSize: {
    width: 154,
    height: 44,
  },
  defaultData: {
    type: 'model',
    props: {
      id: '',
      ruleName: '',
    },
  },
};
