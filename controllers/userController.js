import User from '../models/userModel.js'; // 引入用户模型
import jwt from 'jsonwebtoken'; // JWT 库
// import dotenv from 'dotenv'; // 环境变量
import bcrypt from 'bcrypt'; // 用于加密密码

// 用户注册功能
export const registerUser = async (req, res) => {
  const { phone, password, status } = req.body; // 从请求体中解构提取 phone
  console.log(phone)
  try {
    // 检查必填字段
    if (!phone || !password) {
      return res.status(400).json({ message: '手机号和密码是必填字段' });
    }

    // 检查手机号是否已注册
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: '手机号已被注册' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = await User.create({
      phone,
      password: hashedPassword,
      status: status || 'active', // 默认状态为 active
    });

    res.status(201).json({
      message: '用户注册成功',
      user: {
        id: newUser.id,
        phone: newUser.phone,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error('注册失败:', error.message);
    res.status(500).json({ message: '注册失败', error: error.message });
  }
};


// 用户登录功能
export const loginUser = async (req, res) => {
  const { phone, password } = req.body; // 获取请求体中的手机号和密码

  try {
    // 检查必填字段
    if (!phone || !password) {
      return res.status(400).json({ message: '手机号和密码是必填字段' });
    }

    // 检查用户是否存在
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret 密钥
      { expiresIn: '1h' } // Token 过期时间
    );

    // 返回成功响应
    res.status(200).json({
      message: '登录成功',
      token, // 返回令牌
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    // 错误处理部分
    res.status(500).json({ message: '登录失败', error: error.message });
  }
};

// 为用户分配角色
import Role from '../models/roleModel.js';
export const assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.body;
  
  try {
    const user = await User.findByPk(userId);
    
    const role = await Role.findByPk(roleId);
    
    if (!user || !role) {
      return res.status(404).json({ message: '用户或角色不存在' });
    }

    await user.addRole(role); // Sequelize 提供的关联方法
    res.status(200).json({ message: '角色分配成功' });
  } catch (error) {
    res.status(500).json({ message: '角色分配失败', error: error.message });
  }
};


// 获取用户的角色
export const getUserRoles = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: Role, // 获取关联的角色
    });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.status(200).json({ roles: user.Roles });
  } catch (error) {
    res.status(500).json({ message: '获取用户角色失败', error: error.message });
  }
};