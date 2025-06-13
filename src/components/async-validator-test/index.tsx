import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Alert,
  Divider,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Tag,
  Collapse,
  message,
  Tabs,
} from "antd";
import {
  PlayCircleOutlined,
  CopyOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BookOutlined,
  SettingOutlined,
  BugOutlined,
} from "@ant-design/icons";
import AsyncValidator from "async-validator";
import "./index.less";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface ValidationRule {
  name: string;
  ruleInfo: Array<{
    message: string;
    warningOnly?: boolean;
    validator?: any[];
  }>;
}

const AsyncValidatorTest: React.FC = () => {
  const [form] = Form.useForm();
  const [configForm] = Form.useForm();

  // 状态管理
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [configJson, setConfigJson] = useState<string>("");
  const [convertedRules, setConvertedRules] = useState<any>({});
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [testData, setTestData] = useState<any>({});

  // 默认配置示例
  const defaultConfig = `[
  {
    "name": "signInfo.weight",
    "ruleInfo": [
      {
        "message": "体重结果超过35-42范围，请确认",
        "warningOnly": false,
        "validator": [
          "rules",
          "value",
          "if(!value ){return true;};if(Number(value)>42||Number(value)<35) {return false}; return true;"
        ]
      }
    ]
  },
  {
    "name": "userInfo.email",
    "ruleInfo": [
      {
        "message": "请输入有效的邮箱地址",
        "warningOnly": false,
        "validator": [
          "rules",
          "value",
          "if(!value) return true; const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/; return emailRegex.test(value);"
        ]
      }
    ]
  },
  {
    "name": "userInfo.name",
    "ruleInfo": [
      {
        "message": "姓名不能为空",
        "warningOnly": false,
        "validator": [
          "rules",
          "value",
          "return value && value.trim().length > 0;"
        ]
      },
      {
        "message": "姓名长度应在2-20个字符之间",
        "warningOnly": true,
        "validator": [
          "rules",
          "value",
          "if(!value) return true; return value.length >= 2 && value.length <= 20;"
        ]
      }
    ]
  }
]`;

  // 常用验证规则示例
  const commonRules = {
    required: {
      name: "必填验证",
      config: {
        name: "fieldName",
        ruleInfo: [
          {
            message: "此字段不能为空",
            warningOnly: false,
            validator: ["rules", "value", "return value && value.trim().length > 0;"],
          },
        ],
      },
    },
    email: {
      name: "邮箱验证",
      config: {
        name: "email",
        ruleInfo: [
          {
            message: "请输入有效的邮箱地址",
            warningOnly: false,
            validator: ["rules", "value", "if(!value) return true; const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/; return emailRegex.test(value);"],
          },
        ],
      },
    },
    phone: {
      name: "手机号验证",
      config: {
        name: "phone",
        ruleInfo: [
          {
            message: "请输入有效的手机号码",
            warningOnly: false,
            validator: ["rules", "value", "if(!value) return true; const phoneRegex = /^1[3-9]\\d{9}$/; return phoneRegex.test(value);"],
          },
        ],
      },
    },
    range: {
      name: "数值范围验证",
      config: {
        name: "age",
        ruleInfo: [
          {
            message: "年龄应在18-65岁之间",
            warningOnly: false,
            validator: ["rules", "value", "if(!value) return true; const num = Number(value); return num >= 18 && num <= 65;"],
          },
        ],
      },
    },
  };

  // 解析配置数组
  const handleParseConfig = useCallback(
    (jsonStr: string) => {
      try {
        if (!jsonStr || jsonStr.trim() === "") {
          setValidationRules([]);
          setConvertedRules({});
          return;
        }

        const parsed = JSON.parse(jsonStr);
        setValidationRules(parsed);

        // 转换为 async-validator 格式
        const converted = convertToAsyncValidator(parsed);
        setConvertedRules(converted);

        // 只有在手动点击解析按钮时才显示成功消息
        if (jsonStr === configJson) {
          message.success("配置解析成功！");
        }
      } catch (error) {
        message.error("JSON 格式错误，请检查配置");
        console.error("Parse error:", error);
      }
    },
    [configJson]
  );

  // 初始化默认配置
  useEffect(() => {
    setConfigJson(defaultConfig);
    // 静默解析默认配置，不显示消息
    try {
      const parsed = JSON.parse(defaultConfig);
      setValidationRules(parsed);
      const converted = convertToAsyncValidator(parsed);
      setConvertedRules(converted);
    } catch (error) {
      console.error("Default config parse error:", error);
    }
  }, []);

  // 转换配置数组为 async-validator 规则
  const convertToAsyncValidator = (rules: ValidationRule[]) => {
    const converted: any = {};

    rules.forEach(rule => {
      const fieldName = rule.name;
      converted[fieldName] = [];

      rule.ruleInfo.forEach(ruleInfo => {
        const validatorRule: any = {
          message: ruleInfo.message,
        };

        if (ruleInfo.validator && ruleInfo.validator.length >= 3) {
          const validatorCode = ruleInfo.validator[2];

          validatorRule.validator = (rule: any, value: any, callback: any) => {
            try {
              // 创建一个安全的执行环境
              const func = new Function("rules", "value", validatorCode);
              const result = func(rule, value);

              if (result === true) {
                callback();
              } else {
                if (ruleInfo.warningOnly) {
                  // 警告模式，不阻止提交
                  console.warn(`Warning: ${ruleInfo.message}`);
                  callback();
                } else {
                  callback(new Error(ruleInfo.message));
                }
              }
            } catch (error) {
              console.error("Validator execution error:", error);
              callback(new Error("验证规则执行错误"));
            }
          };
        }

        converted[fieldName].push(validatorRule);
      });
    });

    return converted;
  };

  // 执行验证
  const handleValidate = async () => {
    setIsValidating(true);

    try {
      const formValues = await form.validateFields();
      setTestData(formValues);

      // 使用转换后的规则进行验证
      const schema = new AsyncValidator(convertedRules);

      try {
        await schema.validate(formValues);
        setValidationResult({
          success: true,
          message: "所有验证通过！",
          data: formValues,
        });
        message.success("验证通过！");
      } catch (errorData: any) {
        // async-validator 的错误格式处理
        const errorList = Array.isArray(errorData) ? errorData : errorData.errors || [];

        setValidationResult({
          success: false,
          message: "验证失败",
          errors: errorList,
          data: formValues,
        });
        message.error("验证失败，请查看详细信息");
      }
    } catch (error) {
      message.error("表单填写不完整");
    } finally {
      setIsValidating(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    setValidationResult(null);
    setTestData({});
    message.info("表单已重置");
  };

  // 复制配置
  const handleCopyConfig = () => {
    navigator.clipboard.writeText(configJson);
    message.success("配置已复制到剪贴板");
  };

  // 应用示例规则
  const applyExampleRule = (ruleKey: string) => {
    const rule = commonRules[ruleKey as keyof typeof commonRules];
    if (rule) {
      const newConfig = JSON.stringify([rule.config], null, 2);
      setConfigJson(newConfig);
      handleParseConfig(newConfig);
    }
  };

  return (
    <div className='async-validator-test'>
      <div className='test-header'>
        <Title level={2}>
          <BugOutlined /> Async-Validator 学习测试平台
        </Title>
        <Paragraph>学习和测试 async-validator 插件的使用，支持自定义配置数组转换为验证规则。</Paragraph>
      </div>

      <Tabs defaultActiveKey='1' type='card'>
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              配置与测试
            </span>
          }
          key='1'
        >
          <Row gutter={[24, 24]}>
            {/* 配置区域 */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <span>
                    <SettingOutlined /> 验证规则配置
                  </span>
                }
                className='config-section'
                extra={
                  <Space>
                    <Button icon={<CopyOutlined />} onClick={handleCopyConfig} size='small'>
                      复制
                    </Button>
                    <Button type='primary' icon={<PlayCircleOutlined />} onClick={() => handleParseConfig(configJson)} size='small'>
                      解析
                    </Button>
                  </Space>
                }
              >
                <Space direction='vertical' style={{ width: "100%" }}>
                  <Text strong>JSON 配置数组：</Text>
                  <TextArea
                    value={configJson}
                    onChange={e => setConfigJson(e.target.value)}
                    placeholder='请输入验证规则配置的 JSON 数组'
                    rows={12}
                    className='config-textarea'
                  />

                  <Divider orientation='left'>常用规则模板</Divider>
                  <Space wrap>
                    {Object.entries(commonRules).map(([key, rule]) => (
                      <Tag key={key} color='blue' style={{ cursor: "pointer" }} onClick={() => applyExampleRule(key)}>
                        {rule.name}
                      </Tag>
                    ))}
                  </Space>
                </Space>
              </Card>

              {/* 转换结果预览 */}
              <Card title='转换后的验证规则预览' className='preview-section' style={{ marginTop: 16 }}>
                <TextArea value={JSON.stringify(convertedRules, null, 2)} readOnly rows={8} className='preview-textarea' />
              </Card>
            </Col>

            {/* 测试区域 */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <span>
                    <BugOutlined /> 验证测试表单
                  </span>
                }
                className='test-section'
                extra={
                  <Space>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>
                      重置
                    </Button>
                    <Button type='primary' icon={<PlayCircleOutlined />} onClick={handleValidate} loading={isValidating}>
                      执行验证
                    </Button>
                  </Space>
                }
              >
                <Form form={form} layout='vertical' className='test-form'>
                  {validationRules.map((rule, index) => {
                    const fieldName = rule.name;
                    const isNestedField = fieldName.includes(".");

                    return (
                      <Form.Item
                        key={index}
                        label={`${fieldName} (${rule.ruleInfo.length}个规则)`}
                        name={isNestedField ? fieldName.split(".") : fieldName}
                        help={
                          <div>
                            {rule.ruleInfo.map((ruleInfo, ruleIndex) => (
                              <div key={ruleIndex} style={{ fontSize: "12px", color: "#666" }}>
                                • {ruleInfo.message}
                                {ruleInfo.warningOnly && <Tag color='orange'>警告</Tag>}
                              </div>
                            ))}
                          </div>
                        }
                      >
                        {fieldName.includes("weight") || fieldName.includes("age") ? (
                          <InputNumber placeholder={`请输入${fieldName}`} style={{ width: "100%" }} />
                        ) : fieldName.includes("email") ? (
                          <Input placeholder={`请输入${fieldName}`} type='email' />
                        ) : (
                          <Input placeholder={`请输入${fieldName}`} />
                        )}
                      </Form.Item>
                    );
                  })}
                </Form>
              </Card>

              {/* 验证结果 */}
              {validationResult && (
                <Card title='验证结果' className='result-section' style={{ marginTop: 16 }}>
                  {validationResult.success ? (
                    <Alert message='验证成功' description={validationResult.message} type='success' icon={<CheckCircleOutlined />} showIcon />
                  ) : (
                    <Alert
                      message='验证失败'
                      description={
                        <div>
                          <p>{validationResult.message}</p>
                          {validationResult.errors && (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              {validationResult.errors.map((error: any, index: number) => (
                                <li key={index}>
                                  <Text code>{error.field}</Text>: {error.message}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      }
                      type='error'
                      icon={<ExclamationCircleOutlined />}
                      showIcon
                    />
                  )}

                  <Divider />
                  <Text strong>测试数据：</Text>
                  <pre
                    style={{
                      background: "#f5f5f5",
                      padding: 12,
                      borderRadius: 4,
                      marginTop: 8,
                      fontSize: "12px",
                    }}
                  >
                    {JSON.stringify(validationResult.data, null, 2)}
                  </pre>
                </Card>
              )}
            </Col>
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BookOutlined />
              使用文档
            </span>
          }
          key='2'
        >
          <Card title='Async-Validator 使用指南'>
            <Collapse>
              <Panel header='1. 基本概念' key='1'>
                <Paragraph>
                  <Text strong>async-validator</Text> 是一个强大的异步验证库，广泛用于表单验证。 它支持多种验证规则类型，包括同步和异步验证。
                </Paragraph>
                <Paragraph>
                  <Text strong>主要特性：</Text>
                  <ul>
                    <li>支持同步和异步验证</li>
                    <li>丰富的内置验证规则</li>
                    <li>自定义验证函数</li>
                    <li>国际化支持</li>
                    <li>深度嵌套对象验证</li>
                  </ul>
                </Paragraph>
              </Panel>

              <Panel header='2. 配置数组格式说明' key='2'>
                <Paragraph>
                  <Text strong>配置数组结构：</Text>
                </Paragraph>
                <pre style={{ background: "#f5f5f5", padding: 12, borderRadius: 4 }}>
                  {`{
  "name": "字段名称",           // 要验证的字段名
  "ruleInfo": [               // 验证规则数组
    {
      "message": "错误提示信息",  // 验证失败时的提示
      "warningOnly": false,     // 是否仅警告（不阻止提交）
      "validator": [            // 自定义验证函数
        "rules",                // 第一个参数：规则对象
        "value",                // 第二个参数：字段值
        "验证逻辑代码"           // 第三个参数：验证函数体
      ]
    }
  ]
}`}
                </pre>
              </Panel>

              <Panel header='3. 验证函数编写规则' key='3'>
                <Paragraph>
                  <Text strong>验证函数返回值：</Text>
                  <ul>
                    <li>
                      <Text code>true</Text> - 验证通过
                    </li>
                    <li>
                      <Text code>false</Text> - 验证失败
                    </li>
                    <li>抛出异常 - 验证错误</li>
                  </ul>
                </Paragraph>
                <Paragraph>
                  <Text strong>常用验证示例：</Text>
                </Paragraph>
                <pre style={{ background: "#f5f5f5", padding: 12, borderRadius: 4 }}>
                  {`// 必填验证
"return value && value.trim().length > 0;"

// 邮箱验证
"if(!value) return true; const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/; return emailRegex.test(value);"

// 数值范围验证
"if(!value) return true; const num = Number(value); return num >= 18 && num <= 65;"

// 长度验证
"if(!value) return true; return value.length >= 2 && value.length <= 20;"`}
                </pre>
              </Panel>

              <Panel header='4. 高级用法' key='4'>
                <Paragraph>
                  <Text strong>嵌套字段验证：</Text>
                  使用点号分隔的字段名，如 <Text code>user.profile.email</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>警告模式：</Text>
                  设置 <Text code>warningOnly: true</Text> 可以显示警告但不阻止表单提交
                </Paragraph>
                <Paragraph>
                  <Text strong>异步验证：</Text>
                  在验证函数中可以使用 Promise 或 async/await 进行异步验证
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AsyncValidatorTest;
