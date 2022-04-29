import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
router.route('/profile/update').put(protect, updateUserProfile)
router.route('/signup').post(registerUser)
//router.route('/profile/delete').delete(protect,deleteUserProfile)
router.delete('/profile/delete', deleteUserProfile)

export default router