import React from 'react';
import { Input, Switch, InputNumber } from 'antd';

export type PanelChangeHandler = (data: { prop: string; value: any; history?: boolean }) => void;

export interface DetailPanelRowProps extends Object {
  title: string;
  prop: string;
  value: any;
  onChange: PanelChangeHandler;
}

const { TextArea } = Input;

export const RowInput = ({ prop, title, value, onChange }: DetailPanelRowProps) => {
  return (
    <div className="pe-detail-panel-row">
      <span>{title}</span>
      <Input
        style={{ width: 120 }}
        value={value}
        onChange={(evt) => onChange({ prop, value: evt.target.value, history: false })}
      />
    </div>
  );
};

export const RowTextArea = ({ prop, title, value, onChange }: DetailPanelRowProps) => {
  return (
    <div className="pe-detail-panel-row">
      <span>{title}</span>
      <TextArea
        style={{ width: 120 }}
        value={value}
        onChange={(evt) => onChange({ prop, value: evt.target.value, history: false })}
      />
    </div>
  );
};

export const itemMap = {
  input: RowInput,
  textarea: RowTextArea
};
