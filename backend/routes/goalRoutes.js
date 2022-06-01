import express from "express";
const router = express.Router()
import { getWorkouts, getDiets, saveGoal, getUserGoal, getFoodList, getWorkoutList, getGoalWorkout, getGoalDiet, deleteGoal } from '../controllers/goalController.js'

router.post('/workouts', getWorkouts)
router.post('/diet', getDiets)
router.post('/save', saveGoal)
router.post('/data', getUserGoal)
router.post('/get/workout', getWorkoutList)
router.post('/get/food', getFoodList)
router.post('/get/goal/workout', getGoalWorkout)
router.post('/get/goal/diet', getGoalDiet)
router.delete('/delete/progress', deleteGoal)

export default router