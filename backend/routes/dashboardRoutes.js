import express from "express";
import { getQuestions, getAnswers, postQuestion } from "../controllers/dashboardController.js";
const router = express.Router()


router.get('/', getQuestions)
router.get('/answers/:id', getAnswers)
router.post('/post', postQuestion)
    
export default router