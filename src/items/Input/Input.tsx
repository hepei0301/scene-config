import React, { useState } from 'react';

export interface InputProps {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  color: string;
  placeholder: string;
  value: string;
}

function Input(props: any) {
  // console.log('按钮得属性', props)
  const { defaultData } = props.data;
  // const [state, setstate] = useState('')

  return (
    <div style={{ ...props.data.defaultSize, background: 'green' }}>
      {defaultData.placeholder}
      {defaultData.value}
    </div>
  );
}

export default Input;
