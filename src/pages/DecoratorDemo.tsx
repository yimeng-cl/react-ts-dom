import React from "react";
import { Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

// 方法装饰器示例
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    // 在方法调用前输出日志
    console.log(`调用方法: ${propertyKey}, 参数:`, args);
    const result = originalMethod.apply(this, args);
    // 在方法调用后输出日志
    console.log(`方法 ${propertyKey} 返回:`, result);
    return result;
  };
  return descriptor;
}

// 支持参数的类装饰器工厂
/**
 * 类装饰器工厂，支持传递自定义label参数
 * @param label 你想传递的参数
 */
function addCreatedAt(label: string) {
  // 返回真正的装饰器函数
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      createdAt = new Date(); // 新增属性，记录创建时间
      label = label; // 新增属性，保存传入的参数
      constructor(...args: any[]) {
        super(...args);
        // 实例化时输出日志，展示参数
        console.log("addCreatedAt参数：", label);
      }
    };
  };
}

// 使用装饰器的类
@addCreatedAt("自定义标签") // 这里传递参数
class DemoClass {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @log
  sayHello(msg: string) {
    console.log("sayHello", msg);
    return `Hello, ${this.name}! ${msg}`;
  }
}

// 页面组件
const DecoratorDemo: React.FC = () => {
  // 实例化并调用方法，演示装饰器效果
  const demo = new DemoClass("张三");
  const helloMsg = demo.sayHello("欢迎学习装饰器！");
  // @ts-ignore
  const createdAt = demo.createdAt;

  return (
    <Card style={{ maxWidth: 700, margin: "32px auto" }}>
      <Title level={3}>JS/TS 装饰器简单应用</Title>
      <Button
        type='primary'
        onClick={() => {
          console.log(demo);
          demo.sayHello("欢迎学习装饰器！");
        }}
      >
        say
      </Button>
      <Paragraph>
        <b>类装饰器：</b>为类添加 <code>createdAt</code> 属性。
        <br />
        <b>方法装饰器：</b>为 <code>sayHello</code> 方法添加日志输出。
      </Paragraph>

      <Paragraph>
        <b>运行效果：</b>
        <br />
        <div>
          helloMsg: <span style={{ color: "green" }}>{helloMsg}</span>
        </div>
        <div>
          createdAt: <span style={{ color: "blue" }}>{String(createdAt)}</span>
        </div>
        <div style={{ color: "#888", fontSize: 12, marginTop: 8 }}>（请打开控制台查看方法调用日志）</div>
      </Paragraph>
    </Card>
  );
};

export default DecoratorDemo;
