import React from 'react';
import { Editable } from 'src/editor';

export interface ButtonProps {
  //   backgroundColor: string;
  //   borderWidth: string | number;
  //   borderColor: string;
  //   color: string;
  //   circle: boolean;
  textContent: string;
  data: any;
  //   disabled: boolean;
}

function Button(props: ButtonProps) {
  // console.log('按钮得属性', props)
  const { defaultData } = props.data;
  //   const { disabled, circle, textContent, ...style } = props;

  // TODO: disabled 在编辑模式的时候不要设置, 设置之后不能响应点击事件
  return (
    // <Editable prop="textContent">
    <button style={{ ...props.data.defaultSize }}>
      <span>{defaultData.textContent}</span>
    </button>
    // </Editable>
  );
}

export default Button;
