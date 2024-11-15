import express from 'express';
import userRoutes from './user.js';

const router = express.Router();

// 定义根路径的路由
router.get('/', (req, res) => {
  res.send('官网主页');
});

// 挂载用户相关路由
router.use('/user', userRoutes);

export default router;