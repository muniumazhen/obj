import express from 'express';

import { registerUser , loginUser } from '../controllers/userController.js';

const router = express.Router();

// 注册用户
router.post('/register', registerUser);

// 登陆
router.post('/login', loginUser);


export default router;