import asyncHandler from "express-async-handler";
import TrackingProgress from '../models/trackingProgressModel.js'
import DailyUpdates from '../models/dailyUpdatesModel.js'
import Exercise from '../models/exerciseModel.js'
import Food from '../models/foodModel.js'
import { ObjectId } from 'mongodb';

async function promisesWorkout(obj) {
    var workoutCaloriesBurnt = 0
    const _id = ObjectId(obj.exerciseName)
    const exercise = await Exercise.findById(obj.exerciseName)
    const { caloriesBurnt, sets, reps } = exercise
    var product = Number(sets) * Number(reps)
    var ratio = (caloriesBurnt) / (product)
    workoutCaloriesBurnt = (ratio * obj.setsXreps)
    return workoutCaloriesBurnt
}

async function promisesDiet(obj) {
    var dietCaloriesBurnt = 0
    const _id = ObjectId(obj.foodName)
    const food = await Food.findById(obj.foodName)
    const { calories, quantity } = food
    var totalCalories = calories * quantity
    var userIntake = obj.quantity * calories
    return userIntake
}

async function promisesDailyUpdates(dailyUpdates) {
    var caloriesBurnt = 0
    var caloriesIntake = 0
    const _id = ObjectId(dailyUpdates)
    const du = await DailyUpdates.findById(_id)
    const { workout, food } = du

    const unresolved_w = workout.map(async (obj) => {
        return await promisesWorkout(obj)
    })

    const unresolved_d = food.map(async (obj) => {
        return await promisesDiet(obj)
    })

    const arr_w = await Promise.all(unresolved_w)
    const arr_d = await Promise.all(unresolved_d)
    arr_w.map(i => {
        caloriesBurnt += i
    })
    arr_d.map(i => {
        caloriesIntake += i
    })
    return {
        caloriesBurnt: caloriesBurnt,
        caloriesIntake: caloriesIntake
    }
}

const getTrackingProgress = asyncHandler(async (req, res) => {
    const { _id } = req.body
    var caloriesBurntTillDay = 0
    var caloriesIntakeTillDay = 0
    const _tp = await TrackingProgress.findOne({ user: _id })
    if (_tp) {
        const { dailyUpdates } = _tp
        const unresolved = dailyUpdates.map(async (i) => {
            return await promisesDailyUpdates(i)
        })

        const arr_w = await Promise.all(unresolved)
        arr_w.map(i => {
            caloriesBurntTillDay += i.caloriesBurnt
            caloriesIntakeTillDay += i.caloriesIntake
        })
        res.json({
            totalCaloriesBurnt: caloriesBurntTillDay,
            totalCaloriesIntake: caloriesIntakeTillDay,
            days: dailyUpdates.length
        })
    }
    else {
        res.json({})
    }
})

export { getTrackingProgress }