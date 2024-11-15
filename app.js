// 导入 Express
import express, { json } from 'express';
// 导入 dotenv虚拟环境
import dotenv from 'dotenv';
dotenv.config();

// 创建一个 Express 应用
const app = express();

// 使用环境变量配置端口和其他设置
const PORT = process.env.PORT || 3000; // 如果 PORT 未定义，默认使用 3000

// 中间件：解析 JSON 数据
app.use(json());

// 导入主路由
import routes from './routes/index.js';
// 使用主路由
app.use('/', routes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});