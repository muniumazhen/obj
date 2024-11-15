import express from 'express';

import { registerUser , loginUser, assignRoleToUser, getUserRoles} from '../controllers/userController.js';
import { createRole, assignPermissionToRole, getRolePermissions } from '../controllers/roleController.js';
import { createPermission } from '../controllers/permissionController.js';

const router = express.Router();

// 注册用户
router.post('/register', registerUser);

// 登陆
router.post('/login', loginUser);

// 创建角色
router.post('/role', createRole);

// 为用户分配角色
router.post('/assign-role', assignRoleToUser);

// 获取用户角色
router.get('/:userId/roles', getUserRoles);

// 创建权限
router.post('/permission/create', createPermission);

// 为角色分配权限
router.post('/assign-permission', assignPermissionToRole);

// 获取角色的权限
router.get('/:roleId/permissions', getRolePermissions);

export default router;