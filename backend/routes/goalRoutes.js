import express from "express";
const router = express.Router()
import { getWorkouts, getDiets, saveGoal } from '../controllers/goalController.js'

router.post('/workouts', getWorkouts)
router.post('/diet', getDiets)
router.post('/save', saveGoal)
export default router