import express from 'express';
import { registerUser, loginUser } from '../controllers/userControllers';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

export default router;
