import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUser } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.post('/settings', updateUser)
router.post('/signup', registerUser)
// router.route('/settings').post(protect, updateUser)

export default router