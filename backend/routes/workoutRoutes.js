import express from "express";
const router = express.Router()
import { getExercises, addWorkout, getWorkouts } from '../controllers/workoutController.js'

router.get('/exercises', getExercises)
router.post('/add', addWorkout)
router.get('/data', getWorkouts)
export default router