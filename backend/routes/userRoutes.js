import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, deleteUserProfile, verifyEmail } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
router.route('/profile/update').put(protect, updateUserProfile)
router.route('/signup').post(registerUser)
//router.route('/profile/delete').delete(protect,deleteUserProfile)
router.delete('/profile/delete', deleteUserProfile)
router.post('/email/verify', verifyEmail)


export default router