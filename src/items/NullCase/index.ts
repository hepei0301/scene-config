import type { ComponentOptions } from 'src/editor/type';
import Case, { CaseProps } from './Case';

export const caseOptions: ComponentOptions<CaseProps> = {
  component: Case,
  defaultSize: {
    width: 154,
    height: 44,
  },
  defaultData: {
    // backgroundColor: '#fff',
    // borderColor: '#d9d9d9',
    // color: 'rgba(0, 0, 0, 0.65)',
    // borderWidth: 1,
    value: 'case1',
  },
  detailPanel: [
    // {
    //   title: '外观',
    //   list: [
    //     { title: '背景颜色', prop: 'backgroundColor', type: 'color' },
    //     { title: '边框颜色', prop: 'borderColor', type: 'color' },
    //     { title: '边框宽度', prop: 'borderWidth', type: 'number' },
    //   ],
    // },
    {
      title: '字段设置',
      list: [
        { title: '文字内容', prop: 'value', type: 'input' },
        { title: '提示信息', prop: 'placeholder', type: 'input' },
      ],
    },
  ],
};
