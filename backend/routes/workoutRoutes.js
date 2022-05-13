import express from "express";
const router = express.Router()
import { getExercises, addWorkout } from '../controllers/workoutController.js'

router.get('/exercises', getExercises)
router.post('/add', addWorkout)


export default router