import Exercise from '../models/exerciseModel.js'
import Workout from '../models/workoutModel.js'
import asyncHandler from "express-async-handler";
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';


const getExercises = asyncHandler(async (req, res) => {
    const data = await Exercise.find()
    const exercies = data.map((i) => {
        return {
            name: i.name,
            benefit: i.benefit,
            _id: i._id,
            calories: i.caloriesBurnt
        }
    })
    res.json(
        exercies
    )
})

const addWorkout = asyncHandler(async (req, res) => {
    const { workout, totalCaloriesCount, tags } = req.body
    const exercises = workout.map(i => {
        return i._id
    })
    await Workout.create({
        exercises,
        totalCaloriesCount,
        tags
    })
    res.json(
        {
            message: "Workout Added"
        }
    )
})

export { getExercises, addWorkout }