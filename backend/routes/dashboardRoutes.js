import express from "express";
import { getQuestions, getAnswers } from "../controllers/dashboardController.js";
const router = express.Router()


router.get('/', getQuestions)
router.get('/answers/:id', getAnswers)

export default router