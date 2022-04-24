import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js"
import { protect } from '../middleware/authMiddleware.js'




router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/').post(registerUser)


export default router