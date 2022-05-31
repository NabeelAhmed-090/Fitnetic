import asyncHandler from "express-async-handler";
import TrackingProgress from '../models/trackingProgressModel.js'
import DailyUpdates from '../models/dailyUpdatesModel.js'
import Exercise from '../models/exerciseModel.js'

//total 120

//e 1 20
//e 2 40 
//e 3 60

async function promisesWorkout(workout) {
    var workoutCaloriesBurnt = 0
    const unresolved = workout.map(async (obj) => {
        const exercise = await Exercise.findById(obj.exerciseName)
        const { caloriesBurnt, sets, reps } = exercise
        var product = Number(sets) * Number(reps)
        var ratio = (caloriesBurnt) / (product)
        workoutCaloriesBurnt = workoutCaloriesBurnt + (ratio * obj.setsXreps)
    })
    await Promise.all(unresolved)
    return workoutCaloriesBurnt
}

async function promisesDailyUpdates(dailyUpdates) {
    var totalCaloriesBurnt = 0
    const unresolved = dailyUpdates.map(async (obj) => {
        const du = await DailyUpdates.findById(obj)
        totalCaloriesBurnt = totalCaloriesBurnt + promisesWorkout(du.workout)
    })
    await Promise.all(unresolved)
    return totalCaloriesBurnt
}

const getTrackingProgress = asyncHandler(async (req, res) => {
    const { _id } = req.body
    var caloriesTillDay = 0
    const _tp = await TrackingProgress.findOne({ user: _id }) //user or null
    if (_tp) {
        const unresolved = _tp.dailyUpdates.map(async (i) => {
            caloriesTillDay = caloriesTillDay + await promisesDailyUpdates(i)
        })
        await Promise.all(unresolved)

        res.json({
            totalCaloriesBurnt: caloriesTillDay
        })
    }
    else {
        res.json({})
    }
})

export { getTrackingProgress }