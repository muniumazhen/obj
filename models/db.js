import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // 加载 .env 文件中的环境变量

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  process.env.DB_NAME, // 数据库名称
  process.env.DB_USER, // 数据库用户名
  process.env.DB_PASSWORD, // 数据库密码
  {
    host: process.env.DB_HOST, // 数据库主机地址，例如 "localhost"
    dialect: 'mysql', // 使用的数据库类型
    port: process.env.DB_PORT || 3306, // 数据库端口，默认为 3306
    logging: false, // 禁用日志（可根据需要启用）
    timezone: process.env.DB_TIME, // 设置 Sequelize 的时区
  }
);

// 测试数据库连接
(async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error.message);
  }
})();

export default sequelize; // 导出 Sequelize 实例