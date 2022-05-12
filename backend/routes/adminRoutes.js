import express from "express";
const router = express.Router()
import { authUser } from '../controllers/adminController.js'

router.get('/login', authUser)

export default router