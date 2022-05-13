import express from "express";
const router = express.Router()
import { authUser, getUser } from '../controllers/adminController.js'

router.post('/login', authUser)
router.get('/users', getUser)

export default router