import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db.js';

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 确保权限名称唯一
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
},
{
  timestamps: false, // 启用时间戳
  updatedAt: false, // 禁用 updatedAt 字段
  createdAt:false // 禁用 createdAt 字段
});

export default Permission;