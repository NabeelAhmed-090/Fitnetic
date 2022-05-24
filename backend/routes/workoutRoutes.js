import express from "express";
const router = express.Router()
import { deleteWorkout,getExercises, addWorkout, getWorkouts } from '../controllers/workoutController.js'

router.get('/exercises', getExercises)
router.post('/add', addWorkout)
router.get('/data', getWorkouts)
router.delete('/delete', deleteWorkout)
export default router