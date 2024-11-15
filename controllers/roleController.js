import Role from '../models/roleModel.js';
import Permission from '../models/permissionModel.js';

// 创建新角色
export const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const role = await Role.create({ name });
    res.status(201).json({ message: '角色创建成功', role });
  } catch (error) {
    res.status(500).json({ message: '角色创建失败', error: error.message });
  }
};


// 为角色分配权限
export const assignPermissionToRole = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role) {
      return res.status(404).json({ message: '角色不存在' });
    }

    if (!permission) {
      return res.status(404).json({ message: '权限不存在' });
    }

    // 分配权限
    await role.addPermission(permission);
    res.status(200).json({ message: '权限分配成功' });
  } catch (error) {
    res.status(500).json({ message: '权限分配失败', error: error.message });
  }
};

// 获取角色的权限
export const getRolePermissions = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findByPk(roleId, {
      include: Permission, // 包含权限信息
    });

    if (!role) {
      return res.status(404).json({ message: '角色不存在' });
    }

    res.status(200).json({ permissions: role.Permissions });
  } catch (error) {
    res.status(500).json({ message: '获取权限失败', error: error.message });
  }
};