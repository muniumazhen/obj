import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db.js'; // 导入 Sequelize 实例

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 确保角色名称唯一
  },
},
{
  timestamps: false, // 启用时间戳
  updatedAt: false, // 禁用 updatedAt 字段
  createdAt:false // 禁用 createdAt 字段
});

export default Role;