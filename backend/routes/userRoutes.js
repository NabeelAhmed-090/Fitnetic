import express from "express";
const router = express.Router()
import { authUser, getUsers, getUserById } from "../controllers/userController.js"





router.post('/login', authUser)

router.route('/').get(getUsers)

router.route('/:id').get(getUserById)

export default router