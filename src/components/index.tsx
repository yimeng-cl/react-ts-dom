import { Button } from "antd";
import { Component, createContext, useEffect, useRef, useState } from "react";
import TestTable from "./test-table";
import JsBarcode from "jsbarcode";
import MonacoEditor from "./monaco-editor";

const EDITOR_CONTEXT = createContext<any>(null);

export default function Components() {
  const barcodeRef = useRef<any>();
  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, "123456788", {
        margin: 0,
        height: 60,
        width: 2,
        displayValue: false,
      });
    }
  }, []);
  return (
    <div>
      <div style={{ width: "160px" }}>
        <img
          ref={barcodeRef}
          alt='图片'
          style={{
            width: "100%",
          }}
        />
      </div>
      <MonacoEditor height={300} width={500} defaultValue='1233' />
      {/* <TestTable /> */}
    </div>
  );
}
