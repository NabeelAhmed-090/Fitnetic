import express from "express";
const router = express.Router()
import { getWorkouts, getDiets } from '../controllers/goalController.js'

router.get('/workouts', getWorkouts)
router.get('/diet', getDiets)
export default router