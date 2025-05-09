import * as monaco from "monaco-editor";
import React, { useEffect, useLayoutEffect, useRef } from "react";

type IEditorProps = {
  defaultValue?: string;
  value?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  readonly?: boolean;
  onSave?: (value: string) => void;
  onValueChange?: (value: string) => void;
};
const MonacoEditor = (props: IEditorProps) => {
  const { height, width, defaultValue, style, onValueChange, readonly, value, onSave } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

  useLayoutEffect(() => {
    let model: monaco.editor.ITextModel;
    if (editorRef.current) {
      model = monaco.editor.createModel(value || defaultValue || "", "javascript");
      const _editor = monaco.editor.create(editorRef.current, {
        language: "javascript",
      });

      // _editor.setModel(model);
      // _editor.onDidChangeModelContent(() => {
      //   const newValue = _editor.getValue();
      //   onValueChange?.(newValue || "");
      // });
      // _editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      //   const newValue = _editor.getValue();
      //   onSave?.(newValue);
      // });
      editor.current = _editor;
    }
    return () => {
      editor.current?.dispose();
      if (model) {
        model.dispose();
      }
    };
  }, [editorRef]);

  useEffect(() => {
    if (!editor.current) return;
    const model = editor.current.getModel()!;
    if (typeof value === "string") {
      model.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (!editor.current) return;
    editor.current.updateOptions({
      readOnly: readonly,
    });
  }, [readonly]);

  return (
    <div style={style}>
      <div style={{ height, width }} ref={editorRef}></div>
    </div>
  );
};

export default MonacoEditor;
