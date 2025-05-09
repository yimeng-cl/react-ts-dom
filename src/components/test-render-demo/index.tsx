import { Button } from "@cffe/h2o-design";
import React, { useImperativeHandle, useRef, useState } from "react";

const ChildrenDemo = React.forwardRef(({ id, onRenderDone }, ref) => {
  if (!id) {
    return null;
  }
  useImperativeHandle(ref, () => ({
    getDemo: () => {
      return id;
    },
  }));
  onRenderDone.current();
  return <div>ChildrenDemo</div>;
});

const ParentDemo = React.forwardRef(({}, ref) => {
  const childrenRef = useRef();
  const [childrenId, setChildrenId] = useState<string>("");

  const childrenPromise = useRef<Promise<boolean>>();
  const childrenResolve = useRef<(value: PromiseLike<boolean>) => void>();

  console.log("渲染");

  useImperativeHandle(ref, () => ({
    getDemo: async (id: string) => {
      setChildrenId(id);
      childrenPromise.current = new Promise(resolve => {
        childrenResolve.current = resolve;
      });
      await childrenPromise.current;
      getChildrenId();
    },
  }));

  const getChildrenId = () => {
    if (childrenRef.current) {
      console.log(childrenRef.current.getDemo(), "aaa");
      return;
    }
    console.log("aaa");
  };
  return <ChildrenDemo ref={childrenRef} id={childrenId} onRenderDone={childrenResolve} />;
});

export default function TestRenderDemo() {
  const parentRef = useRef();
  return (
    <div>
      <Button
        type='primary'
        onClick={async () => {
          parentRef.current.getDemo("123");
        }}
      >
        显示
      </Button>
      <ParentDemo ref={parentRef} />
      <div
        style={{
          width: "100mm",
          height: "10000mm",
          background: "red",
        }}
      >
        123
      </div>
    </div>
  );
}
