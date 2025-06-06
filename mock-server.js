// mock-server.js
// 使用 Node.js 原生 http 模块和 express 框架模拟接口
// 运行：node mock-server.js

const express = require('express');
const app = express();
const port = 7688;

// 允许跨域请求，方便本地调试
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 解析 JSON 请求体
app.use(express.json());

// 统一处理所有 POST 请求
app.post('/TGCtrlApi', (req, res) => {
  // 获取请求体参数
  const { funcName } = req.body;

  // 根据 funcName 返回不同的模拟数据
  let result = {};
  if (funcName === 'InitMedicalPluginConfig') {
    // 初始化接口
    result = {
      errorCode: 0,
      errorMsg: '成功',
      funcName,
      result: '0',
      serverName: req.body.serverName
    };
  } else if (funcName === 'GetFingerData') {
    // 指纹接口
    result = {
      errorCode: 0,
      errorMsg: '成功',
      funcName,
      result: JSON.stringify({
        // 这是一个 1x1 红色像素的 PNG 图片 base64，可正常展示
        fingerImage: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAgMBAp9l2wAAAABJRU5ErkJggg=='
      }),
      serverName: req.body.serverName
    };
  } else if (funcName === 'GetHandWriteImage') {
    // 签名图片接口
    result = {
      errorCode: 0,
      errorMsg: '成功',
      funcName,
      // 这是一个 1x1 蓝色像素的 PNG 图片 base64，可正常展示
      result: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AABfwC/WH2WQAAAABJRU5ErkJggg==',
      serverName: req.body.serverName
    };
  } else if (funcName === 'GetLastError') {
    // 获取错误接口
    result = {
      errorCode: 0,
      errorMsg: '无错误',
      funcName,
      result: '',
      serverName: req.body.serverName
    };
  } else {
    // 未知接口
    result = {
      errorCode: 404,
      errorMsg: '未知接口',
      funcName,
      result: '',
      serverName: req.body.serverName
    };
  }

  // 返回模拟数据
  res.json(result);
});

// 启动服务
app.listen(port, () => {
  console.log(`Mock server 已启动，监听端口 ${port}`);
});