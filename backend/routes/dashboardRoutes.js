import express from "express";
import { getQuestions, getAnswers, postQuestion, postReply } from "../controllers/dashboardController.js";
const router = express.Router()


router.get('/', getQuestions)
router.get('/answers/:id', getAnswers)
router.post('/post', postQuestion)
router.post('/reply/:id', postReply)

export default router