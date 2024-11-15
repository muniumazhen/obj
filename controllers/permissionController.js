import Permission from '../models/permissionModel.js';

// 创建新权限
export const createPermission = async (req, res) => {
  const { name , url} = req.body;

  try {
    const permission = await Permission.create({ name , url});
    res.status(201).json({ message: '权限创建成功', permission });
  } catch (error) {
    res.status(500).json({ message: '权限创建失败', error: error.message });
  }
};