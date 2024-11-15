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
app.use(express.urlencoded({ extended: true })); // 用于解析 URL 编码请求体

// 导入主路由
import routes from './routes/index.js';
// 使用主路由
app.use('/', routes);

import sequelize from './models/db.js'; // 引入 Sequelize 实例
import { User, Role ,Permission} from './models/manyToMany.js';
// 同步数据库
(async () => {
  try {
    await sequelize.sync({ alter: true }); // 同步模型到数据库
    console.log('数据库模型同步成功');
  } catch (error) {
    console.error('数据库模型同步失败:', error.message);
  }
})();
// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});