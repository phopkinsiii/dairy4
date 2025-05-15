import express from 'express';
import { getAllUsers, loginUser, registerUser, setAdminRole } from '../controllers/userController.js';
import {adminProtect, protect} from '../middleware/authMiddleware.js'

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser)
router.put('/set-admin/:userId', protect, adminProtect, setAdminRole)
router.get('/', protect, adminProtect, getAllUsers)

export default router;