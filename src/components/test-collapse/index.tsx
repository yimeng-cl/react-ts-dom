import { Collapse } from "antd";
import React from "react";
import Header from "./header";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TestCollapse: React.FC = () => {
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header={<Header />} key='1'>
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default TestCollapse;
