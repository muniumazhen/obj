import User from './userModel.js';
import Role from './roleModel.js';
import Permission from './permissionModel.js';

// 定义用户和角色多对多关系
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

// 定义角色和权限多对多关系
Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });


export { User, Role ,Permission};