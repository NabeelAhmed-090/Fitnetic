import Workout from '../models/workoutModel.js'
import asyncHandler from "express-async-handler";
import Exercise from '../models/exerciseModel.js';
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
    const { workout, totalCaloriesCount, tags, name } = req.body
    const exercises = workout.map(i => {
        return i._id
    })
    await Workout.create({
        exercises,
        totalCaloriesCount,
        tags,
        name
    })
    res.json(
        {
            message: "Workout Added"
        }
    )
})

const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({})
    const workoutsList = workouts.map((i) => {
        return (
            {
                name: i.name,
            }
        )
    })
    res.json(workoutsList)
})


export { getExercises, addWorkout, getWorkouts }