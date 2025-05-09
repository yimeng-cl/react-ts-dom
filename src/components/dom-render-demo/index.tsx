import { Button } from "antd";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";

const Children = React.forwardRef((props, ref) => {
  console.log(ref);
  useImperativeHandle(ref, () => {
    getDom: () => {
      console.log("dome");
    };
  });
  return <div>Children</div>;
});

export default function DomRenderDemo() {
  const childRef = useRef();
  const divRef = useRef();
  const handleClick = useCallback(() => {
    ReactDOM.render(<Children ref={childRef} />, divRef.current, () => {
      console.log("childRef", childRef);
    });
  }, [childRef.current]);
  return (
    <Button onClick={handleClick} type='primary'>
      parent
      <div ref={divRef}>123·</div>
    </Button>
  );
}
