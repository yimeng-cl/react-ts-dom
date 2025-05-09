import React, { useEffect, useRef } from "react";

const TestScroll = () => {
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, []);

  return (
    <div ref={parentRef} style={{ height: "400px", overflowY: "scroll" }}>
      {/* 渲染多个子盒子 */}
      {[...Array(20)].map((_, index) => (
        <div key={index} style={{ height: "100px" }}>
          子盒子 {index + 1}
        </div>
      ))}
    </div>
  );
};

export default TestScroll;
