import { Input } from 'antd'
import { debounce } from 'lodash';
import React from 'react'
const handleInput = ()=> {
  console.log('input')
};

export default function TestInput() {
  return (
    <div>
      <Input placeholder='请输入内容' onChange={debounce(handleInput, 500)} />
    </div>
  );
}
