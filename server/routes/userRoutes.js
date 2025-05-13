import express from 'express';
import { getAllUsers, loginUser, registerUser, requestPasswordReset, resetPassword, setAdminRole } from '../controllers/userController.js';
import {adminProtect, protect} from '../middleware/authMiddleware.js'

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword)
router.put('/set-admin/:userId', protect, adminProtect, setAdminRole)
router.get('/', protect, adminProtect, getAllUsers)

export default router;