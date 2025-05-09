import React, { ReactElement, useEffect, useRef, useState } from "react";

import "./index.less";
import { useDebounceFn } from "ahooks";
import { Input, Tooltip } from "@cffe/h2o-design";
import { OPTIONS } from "./utils";

const COM_MAP: Record<string, (props: { value: any; onChange: (val: any) => void; onDelete: () => void; disabled: boolean }) => ReactElement> = {
  text: ({ value, onDelete, disabled, onChange }) => {
    const isComposing = useRef(false);
    console.log(isComposing.current);
    const [inputValue, setInputValue] = useState(value);
    useEffect(() => {
      setInputValue(value);
    }, [value]);
    const { run: callChange } = useDebounceFn(
      (value: string) => {
        if (!value) {
          onDelete();
        } else {
          onChange(value);
        }
      },
      {
        wait: 500,
      }
    );

    return (
      <Input.TextArea
        value={inputValue}
        disabled={disabled}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={e => {
          isComposing.current = false;
          console.log(e, "e");
          onChange((e.target as HTMLTextAreaElement).value);
        }}
        onChange={e => {
          if (isComposing) {
            return;
          }
          callChange(e.target.value);
        }}
        rows={4}
      />
    );
  },
  input: ({ value, onDelete, disabled, onChange }) => {
    const isComposing = useRef(false);
    const { run: callChange } = useDebounceFn(
      (value: string) => {
        if (!value) {
          onDelete();
        } else {
          onChange(value);
        }
      },
      {
        wait: 500,
      }
    );

    return (
      <Input
        value={value}
        disabled={disabled}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={e => {
          isComposing.current = false;
          onChange(e.target.value);
        }}
        onChange={e => {
          if (isComposing) {
            return;
          }
          callChange(e.target.value);
        }}
      />
    );
  },
};

export default function FlexBox() {
  const value = {
    name: "1",
    parentName: "2",
    strPrev: "3",
  };
  const inputOnChange = (v: any, key: string) => {};

  // 删除
  const deleteData = (key: string) => {};

  return (
    <>
      <div className='write-back-options'>
        {OPTIONS.map(config => {
          const { value: item, tip } = config;
          const Com = COM_MAP[config?.type || "text"];
          return (
            <div className='options-box' key={item}>
              {/* <Input className='title' defaultValue={item} /> */}
              <div className='title'>{`${item}:`}</div>
              <div className='value'>
                <Com
                  value={value[item]}
                  onChange={value => {
                    inputOnChange(value, item);
                  }}
                  onDelete={() => {
                    deleteData(item);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
