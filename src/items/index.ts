import { registerComponent } from '../editor/componentUtil';
import type { ItemPanelItem } from '../editor/ItemPanel';
import { buttonOptions } from './Button';
import { inputOptions } from './Input';
import { towerOptions } from './Tower';
import { newsOptions } from './News';
import { timesOptions } from './Times';
import { warnOptions } from './Warn';
import { caseOptions } from './Case';
import { deviceOptions } from './Device';
import { modelOptions } from './Model';
import { nullCaseOptions } from './NullCase';

interface ItemPanelGroup {
  name: string;
  type?: string;
  title?: string;
  children: ItemPanelItem[];
  graphHeight: number;
  layoutOptions?: any;
}

export const itemPanelGroup: ItemPanelGroup[] = [
  {
    name: '输入设备',
    graphHeight: 180,
    type: 'in',
    layoutOptions: {
      columns: 2,
    },
    children: [
      //   { name: '按钮', type: 'device', options: deviceOptions },
      //   { name: '按钮321', type: 'device', options: deviceOptions },
      //   { name: '按3钮', type: 'device', options: deviceOptions },
      { name: '设备', type: 'device', options: deviceOptions },
      { name: '参数', type: 'case', options: caseOptions },
      { name: '空参数', type: 'nullCase', options: nullCaseOptions },
    ],
  },
  {
    name: '规则模型',
    type: 'model',
    graphHeight: 180,
    layoutOptions: {
      columns: 2,
    },
    children: [{ name: '规则模型1', type: 'model', options: modelOptions }],
  },
  {
    name: '开关调用',
    type: 'switch',
    graphHeight: 180,
    layoutOptions: {
      columns: 2,
    },
    children: [
      //   { name: '条件列表', type: 'case', options: caseOptions },
      { name: '消息调用', type: 'switch', options: newsOptions },
      //   { name: '定时开关', type: 'times', options: timesOptions },
    ],
  },
  {
    name: '告警规则',
    type: 'warn',
    graphHeight: 180,
    layoutOptions: {
      columns: 2,
    },
    children: [{ name: '规则模型1', type: 'warn', options: warnOptions }],
  },
  //   {
  //     name: '输出设备',
  //     graphHeight: 180,
  //     layoutOptions: {
  //       columns: 2,
  //     },
  //     children: [{ name: '报警器', type: 'warn', options: warnOptions }],
  //   },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function registerItemPanel(item: ItemPanelItem) {
  registerComponent(item.type, item.options);
  if (item.children) {
    item.children.forEach(registerItemPanel);
  }
}

itemPanelGroup.forEach((item) => item.children.forEach(registerItemPanel));
