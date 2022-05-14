import express from "express";
const router = express.Router()
import { getExercises, addWorkout, checkName, getWorkouts } from '../controllers/workoutController.js'

router.get('/exercises', getExercises)
router.post('/add', addWorkout)
router.post('/add/name', checkName)
router.get('/data', getWorkouts)

export default router