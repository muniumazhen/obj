import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();
// 创建 Sequelize 实例，连接数据库
// 从环境变量中读取数据库名称、用户名、密码，以及主机地址和数据库类型
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // 数据库主机地址
    dialect: 'mysql', // 使用 MySQL 数据库
  });
  
  // 定义用户模型，映射到数据库中的 "User" 表
  const User = sequelize.define('User', {
    // 用户 ID，主键，自动递增
    id: {
      type: DataTypes.INTEGER, // 整数类型
      autoIncrement: true, // 自动递增
      primaryKey: true, // 设置为主键
    },
    // 用户名字段
    phone: {
      type: DataTypes.STRING, // 字符串类型
      allowNull: false, // 允许为空
    },
    // 密码字段
    password: {
      type: DataTypes.STRING, // 字符串类型
      allowNull: false, // 不允许为空
    },
    
    // 用户状态字段
    status: {
      type: DataTypes.ENUM('active', 'inactive'), // 枚举类型，只允许 'active' 或 'inactive'
      defaultValue: 'active', // 默认值为 'active'
    },
    // 创建时间字段
    createdAt: {
      type: DataTypes.DATE, // 日期类型
      defaultValue: Sequelize.NOW, // 默认值为当前时间
    }
  },
  {
    timestamps: true, // 启用时间戳
    updatedAt: false, // 禁用 updatedAt 字段
  });
  
  // 同步模型到数据库，确保表结构与模型匹配
  (async () => {
    try {
      // 使用 sync 方法同步模型到数据库
      // 如果表结构有变化，使用 alter 参数更新表结构
      await sequelize.sync({ alter: true });
      console.log('数据库更新成功!'); // 同步成功时输出提示信息
    } catch (error) {
      console.error('数据库更新失败！:', error); // 如果同步失败，输出错误信息
    }
  })();
  
  // 导出用户模型，以便在其他模块中使用
  export default User;