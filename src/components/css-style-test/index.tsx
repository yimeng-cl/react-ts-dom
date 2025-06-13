import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  Divider,
  Switch,
  Slider,
  Tag,
  Avatar,
  Badge,
  Alert,
  Progress,
  Spin,
  Typography,
  Tooltip,
  Popover,
  Radio,
  Checkbox,
} from "antd";
import { UserOutlined, HeartOutlined, StarOutlined, LikeOutlined, SettingOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.less";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

/**
 * CSS样式测试组件
 * 用于测试各种CSS样式效果和Antd组件的样式定制
 */
const CssStyleTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // 模拟加载状态
  const handleLoadingToggle = () => {
    setLoading(!loading);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={`css-style-test ${theme}-theme`}>
      <div className='test-header'>
        <Title level={2}>CSS 样式测试组件</Title>
        <Paragraph>这是一个用于测试CSS样式和Antd组件效果的测试组件，包含布局、动画、响应式设计等多种样式演示。</Paragraph>
      </div>

      {/* 主题控制区域 */}
      <Card title='主题和动画控制' className='control-section'>
        <Space>
          <Text strong>主题模式：</Text>
          <Radio.Group value={theme} onChange={e => setTheme(e.target.value)} buttonStyle='solid'>
            <Radio.Button value='light'>浅色主题</Radio.Button>
            <Radio.Button value='dark'>深色主题</Radio.Button>
          </Radio.Group>

          <Text strong>动画效果：</Text>
          <Switch checked={animationEnabled} onChange={setAnimationEnabled} checkedChildren='开启' unCheckedChildren='关闭' />
        </Space>
      </Card>

      {/* Flexbox布局测试 */}
      <Card title='Flexbox 布局测试' className='layout-section'>
        <div className='flex-container'>
          <div className='flex-item'>
            <Card size='small' hoverable>
              <Avatar icon={<UserOutlined />} />
              <p>Flex Item 1</p>
            </Card>
          </div>
          <div className='flex-item'>
            <Card size='small' hoverable>
              <Avatar icon={<HeartOutlined />} />
              <p>Flex Item 2</p>
            </Card>
          </div>
          <div className='flex-item'>
            <Card size='small' hoverable>
              <Avatar icon={<StarOutlined />} />
              <p>Flex Item 3</p>
            </Card>
          </div>
        </div>
      </Card>

      {/* CSS Grid布局测试 */}
      <Card title='CSS Grid 布局测试' className='layout-section'>
        <div className='grid-container'>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={`grid-item grid-item-${index + 1}`}>
              <Badge count={index + 1} showZero>
                <Card size='small'>
                  <Text>Grid {index + 1}</Text>
                </Card>
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Antd组件样式测试 */}
      <Card title='Antd 组件样式测试' className='components-section'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Space direction='vertical' size='middle' style={{ width: "100%" }}>
              <Input placeholder='请输入内容' prefix={<SearchOutlined />} className='animated-input' />
              <Select defaultValue='option1' style={{ width: "100%" }} className='animated-select'>
                <Option value='option1'>选项一</Option>
                <Option value='option2'>选项二</Option>
                <Option value='option3'>选项三</Option>
              </Select>
              <DatePicker style={{ width: "100%" }} className='animated-datepicker' />
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Space direction='vertical' size='middle' style={{ width: "100%" }}>
              <Button type='primary' className='gradient-button' block>
                渐变按钮
              </Button>
              <Button type='default' className='shadow-button' block>
                阴影按钮
              </Button>
              <Button type='primary' loading={loading} onClick={handleLoadingToggle} className='animated-button' block>
                {loading ? "加载中..." : "点击加载"}
              </Button>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Space direction='vertical' size='middle' style={{ width: "100%" }}>
              <Progress percent={75} className='animated-progress' />
              <Slider defaultValue={30} className='custom-slider' />
              <div>
                <Tag color='magenta' className='animated-tag'>
                  标签1
                </Tag>
                <Tag color='blue' className='animated-tag'>
                  标签2
                </Tag>
                <Tag color='green' className='animated-tag'>
                  标签3
                </Tag>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 动画效果测试 */}
      <Card title='CSS 动画效果测试' className='animation-section'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div className={`bounce-animation ${animationEnabled ? "active" : ""}`}>
              <Card>
                <Avatar size={64} icon={<LikeOutlined />} />
                <p>弹跳动画</p>
              </Card>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div className={`rotate-animation ${animationEnabled ? "active" : ""}`}>
              <Card>
                <Avatar size={64} icon={<SettingOutlined />} />
                <p>旋转动画</p>
              </Card>
            </div>
          </Col>

          <Col xs={24} sm={8}>
            <div className={`pulse-animation ${animationEnabled ? "active" : ""}`}>
              <Card>
                <Badge dot>
                  <Avatar size={64} icon={<HeartOutlined />} />
                </Badge>
                <p>脉冲动画</p>
              </Card>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 高级样式效果 */}
      <Card title='高级样式效果' className='advanced-section'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className='glassmorphism-card'>
              <Title level={4} style={{ color: "white", margin: 0 }}>
                毛玻璃效果
              </Title>
              <Paragraph style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>现代化的毛玻璃背景效果</Paragraph>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className='neon-card'>
              <Title level={4} style={{ margin: 0 }}>
                霓虹灯效果
              </Title>
              <Paragraph style={{ margin: 0 }}>炫酷的霓虹灯边框效果</Paragraph>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 交互式组件测试 */}
      <Card title='交互式组件测试' className='interactive-section'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Tooltip title='这是一个提示信息'>
              <Button type='primary' block>
                悬停提示
              </Button>
            </Tooltip>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Popover
              content={
                <div>
                  <p>这是一个弹出框内容</p>
                  <Button size='small'>操作按钮</Button>
                </div>
              }
              title='弹出框标题'
              trigger='click'
            >
              <Button block>点击弹出</Button>
            </Popover>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Spin spinning={loading}>
              <Alert message='加载状态' description='这里展示加载状态的效果' type='info' />
            </Spin>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={24}>
                  <Checkbox value='A'>选项 A</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value='B'>选项 B</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
      </Card>

      {/* 禁用交互但允许文本选择测试 */}
      <Card title='禁用交互但允许文本选择测试' className='text-selectable-section'>
        <Alert
          message='测试说明'
          description='以下区域的组件被禁用了点击交互，但文本内容可以被选择和复制。尝试点击组件（无效）和选择文本内容（有效）。'
          type='info'
          showIcon
          style={{ marginBottom: 16 }}
        />

        <div className='disabled-but-selectable'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Space direction='vertical' size='middle' style={{ width: "100%" }}>
                <div>
                  <Text strong>单选组件测试：</Text>
                  <Radio.Group defaultValue='option1' style={{ marginTop: 8 }}>
                    <Space direction='vertical'>
                      <Radio value='option1'>这是第一个选项，可以选择这段文字</Radio>
                      <Radio value='option2'>这是第二个选项，文字内容可以被复制</Radio>
                      <Radio value='option3'>这是第三个选项，试试选择这段描述文本</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Space direction='vertical' size='middle' style={{ width: "100%" }}>
                <div>
                  <Text strong>多选组件测试：</Text>
                  <Checkbox.Group defaultValue={["A", "C"]} style={{ marginTop: 8 }}>
                    <Space direction='vertical'>
                      <Checkbox value='A'>选项A - 可以选择复制这段文字内容</Checkbox>
                      <Checkbox value='B'>选项B - 尝试拖拽选择这行文本</Checkbox>
                      <Checkbox value='C'>选项C - 虽然点击被禁用但文本可选</Checkbox>
                      <Checkbox value='D'>选项D - 测试文本选择功能是否正常</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </div>
              </Space>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Space direction='vertical' size='middle' style={{ width: "100%" }}>
                <div>
                  <Text strong>输入框测试：</Text>
                  <Input placeholder='这是一个禁用的输入框' defaultValue='输入框中的文字可以被选择和复制' style={{ marginTop: 8 }} />
                </div>

                <div>
                  <Text strong>按钮测试：</Text>
                  <Space direction='vertical' style={{ width: "100%", marginTop: 8 }}>
                    <Button type='primary' block>
                      主要按钮 - 可以选择按钮文字
                    </Button>
                    <Button type='default' block>
                      默认按钮 - 文字内容可以复制
                    </Button>
                  </Space>
                </div>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div>
                <Text strong>选择框测试：</Text>
                <Select defaultValue='option1' style={{ width: "100%", marginTop: 8 }} placeholder='这是一个下拉选择框'>
                  <Option value='option1'>选项一 - 可选择的文本</Option>
                  <Option value='option2'>选项二 - 测试文本选择</Option>
                  <Option value='option3'>选项三 - 文字内容可复制</Option>
                </Select>
              </div>
            </Col>

            <Col xs={24} sm={12}>
              <div>
                <Text strong>文本区域测试：</Text>
                <Input.TextArea
                  rows={4}
                  defaultValue='这是一个多行文本输入框的内容。&#10;尝试选择这些文字内容。&#10;虽然无法编辑和点击交互，&#10;但是可以选择和复制这些文本。'
                  style={{ marginTop: 8 }}
                />
              </div>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: "center" }}>
            <Text strong>综合测试区域：</Text>
            <div style={{ marginTop: 16, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
              <Paragraph>
                这是一个包含多种内容的测试区域。你可以尝试选择这段文字，
                <Text strong>包括这些加粗的文本</Text>，<Text italic>以及这些斜体文字</Text>，<Text code>还有这些代码文本</Text>。
              </Paragraph>

              <Space wrap>
                <Tag color='blue'>标签1 - 可选择文本</Tag>
                <Tag color='green'>标签2 - 测试文字选择</Tag>
                <Tag color='orange'>标签3 - 文本内容可复制</Tag>
              </Space>

              <div style={{ marginTop: 16 }}>
                <Button type='primary' style={{ marginRight: 8 }}>
                  按钮文字可选择
                </Button>
                <Button type='default'>这个按钮的文字也可以选择</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 响应式测试提示 */}
      <Alert
        message='响应式测试提示'
        description='请尝试调整浏览器窗口大小来测试响应式布局效果。组件会根据屏幕尺寸自动调整布局。'
        type='success'
        showIcon
        className='responsive-alert'
      />
    </div>
  );
};

export default CssStyleTest;
