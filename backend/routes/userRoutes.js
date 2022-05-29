import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, deleteUserProfile, verifyEmail, dailyUpdate } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/profile', getUserProfile)
router.put('/profile/update', updateUserProfile)
router.route('/signup').post(registerUser)
//router.route('/profile/delete').delete(protect,deleteUserProfile)
router.delete('/profile/delete', deleteUserProfile)
router.post('/email/verify', verifyEmail)
router.post('/profile/dailyUpdate', dailyUpdate)

export default router