import { Button, Input, Modal } from "antd";
import { useRef, useState } from "react";
import Children from "./children";

export default function TestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const valueStr = useRef<string>("aa");

  const handleClick = () => {
    Modal.info({
      title: "Input",
      content: (
        <div>
          <Input
            onChange={e => {
              valueStr.current = e.target.value;
            }}
            defaultValue={valueStr.current}
          />
        </div>
      ),
      onOk() {
        console.log("OK", valueStr.current);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Modal</Button>
      <Modal open={isOpen} onCancel={() => setIsOpen(false)} title='Test Modal' onOk={() => {}}>
        {Children()}
      </Modal>
    </div>
  );
}
