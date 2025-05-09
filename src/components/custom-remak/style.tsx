import { InputNumber } from "@cffe/h2o-design";
import React, { useEffect, useState } from "react";

// 原来默认的字体大小是 14 px
const BIZ_FONT_SIZE = 14;

type valueType = {
  color?: string;
  fontSize?: string;
};

type Props = {
  value?: valueType;
  onChange?: (value: valueType) => void;
};

export default function Style({ value, onChange }: Props) {
  const [fontSizeNumber, setFontSizeNumber] = useState(BIZ_FONT_SIZE);
  useEffect(() => {
    setFontSizeNumber(value?.fontSize ? parseInt(value.fontSize) : BIZ_FONT_SIZE);
  });
  return (
    <div>
      <label htmlFor='color'>颜色：</label>
      <input
        id='color'
        type='color'
        value={value?.color || "#ff0000"}
        onChange={e => {
          onChange?.({ color: e.target.value });
        }}
      />
      <label htmlFor='fontSize'>字号：</label>
      <InputNumber
        precision={0}
        addonAfter='px'
        min={12}
        max={36}
        style={{ width: "100px" }}
        value={fontSizeNumber}
        onChange={fontSize => {
          onChange?.({ fontSize: `${fontSize}px` });
        }}
      />
    </div>
  );
}
