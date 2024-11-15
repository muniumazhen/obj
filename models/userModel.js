import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db.js'; // 导入 Sequelize 实例

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // 设置默认值为当前时间
  },
},
{
  timestamps: true, // 启用时间戳
  updatedAt: false, // 禁用 updatedAt 字段
});

export default User;