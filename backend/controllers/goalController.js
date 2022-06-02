import Diet from '../models/dietModel.js'
import Workout from '../models/workoutModel.js'
import Exercise from '../models/exerciseModel.js'
import Food from '../models/foodModel.js'
import Goal from '../models/goalModel.js'
import { ObjectId } from 'mongodb';
import TrackingProgress from '../models/trackingProgressModel.js'


import asyncHandler from "express-async-handler";
import DailyUpdates from '../models/dailyUpdatesModel.js'

async function promisesWorkout(exercises) {
    const unresolved = exercises.map(async (obj) => {
        if (obj !== null) {
            const _id = ObjectId(obj)
            const exerciese = await Exercise.findById(_id)
            if (exerciese !== null) {
                return (
                    {
                        name: exerciese.name,
                        reps: exerciese.reps,
                        sets: exerciese.sets,
                        id: exerciese._id
                    }
                )
            }
        }
    })

    const exerciseName = await Promise.all(unresolved)
    return exerciseName
}

const getWorkouts = asyncHandler(async (req, res) => {
    const { selectedTags } = req.body
    const workouts = await Workout.find({})

    const unresolved = workouts.map(async (i) => {
        if (i !== null) {
            let check = false
            let itr = 0
            while (itr in i.tags && check == false) {
                for (let tag in selectedTags) {
                    if (selectedTags[tag].match(i.tags[itr])) {
                        check = true
                        break
                    }
                }
                itr += 1
            }
            if (check === true) {
                const exerciseName = await promisesWorkout(i.exercises)
                return (
                    {
                        exercises: exerciseName,
                        name: i.name,
                        calories: i.totalCaloriesCount,
                        id: i._id
                    }
                )
            }
        }
    })

    const workoutsList = await Promise.all(unresolved)

    res.json(workoutsList)
})


async function promisesDiet(food) {
    const unresolved = food.map(async (obj) => {
        const food = await Food.findById(obj.foodName)
        return (
            {
                name: food.name,
                unit: food.unit,
                quantity: obj.quantity,
                id: obj.foodName
            }
        )
    })
    const _food = await Promise.all(unresolved)
    return _food
}

const getDiets = asyncHandler(async (req, res) => {
    const { selectedTags } = req.body
    const diets = await Diet.find({})
    const unresolved = diets.map(async (i) => {
        let check = false
        let itr = 0
        while (itr in i.tags && check == false) {
            for (let tag in selectedTags) {
                if (selectedTags[tag].match(i.tags[itr])) {
                    check = true
                    break
                }
            }
            itr += 1
        }
        if (check === true) {
            const foodName = await promisesDiet(i.food)
            return (
                {
                    food: foodName,
                    name: i.name,
                    calories: i.totalCaloriesCount,
                    id: i._id,
                }
            )
        }
    })

    const dietList = await Promise.all(unresolved)
    res.json(dietList)
})


async function deleteDailyUpdates(dailyUpdates) {
    const unresolved = dailyUpdates.map(async (i) => {
        const id = ObjectId(i)
        await DailyUpdates.deleteOne({ _id: id })
    })
    await Promise.all(unresolved)
}


const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.body
    const user_id = ObjectId(id)
    const goal = await Goal.findOne({ user: user_id })
    if (goal) {
        await Goal.deleteOne({ user: user_id })
        const _tp = await TrackingProgress.findOne({ user: id })
        const { dailyUpdates } = _tp
        if (dailyUpdates) {
            await deleteDailyUpdates(dailyUpdates)
        }
        await TrackingProgress.deleteOne({ user: user_id })
    }
    res.json({})
})

const saveGoal = asyncHandler(async (req, res) => {
    const { data } = req.body
    const user_id = ObjectId(data.user)
    const workout_id = ObjectId(data.workout)
    const diet_id = ObjectId(data.diet)
    const goal = await Goal.findOne({ user: user_id })

    if (goal) {
        await Goal.deleteOne({ user: user_id })
        const _tp = await TrackingProgress.findOne({ user: user_id })
        const { dailyUpdates } = _tp
        if (dailyUpdates) {
            await deleteDailyUpdates(dailyUpdates)
        }
        await TrackingProgress.deleteOne({ user: user_id })
    }
    const newGoal = new Goal({
        user: user_id,
        diet: diet_id,
        workout: workout_id,
    })
    const newTrack = new TrackingProgress({
        user: user_id,
        dailyUpdates: []
    })
    const _goal = await Goal.create(newGoal)
    const check = await TrackingProgress.create(newTrack)
    res.json(newGoal)
})


// getUserGoal

const getUserGoal = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const goal = await Goal.findOne({ user: _id })
    if (goal) {
        const workout_id = ObjectId(goal.workout)
        const workout = await Workout.findById(workout_id)
        const diet_id = ObjectId(goal.diet)
        const diet = await Diet.findById(diet_id)

        var foodName = []
        foodName = await promisesDiet(diet.food)
        var exerciseName = []
        exerciseName = await promisesWorkout(workout.exercises)
        const obj = {
            days: goal.days,
            workoutName: workout.name,
            dietName: diet.name,
            exercises: exerciseName,
            food: foodName,
            WorkoutTotalCalories: workout.totalCaloriesCount * goal.days,
            DietTotalCalories: diet.totalCaloriesCount * goal.days,
        }
        res.json(obj)
    }
    else res.json({})
})

const getFoodList = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const goal = await Goal.findOne({ user: _id })
    if (goal) {
        const diet_id = ObjectId(goal.diet)
        const diet = await Diet.findById(diet_id)
        var foodName = []
        foodName = await promisesDiet(diet.food)
        res.json(foodName)
    }
    else res.json({})
})


const getWorkoutList = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const goal = await Goal.findOne({ user: _id })

    if (goal) {
        const workout_id = ObjectId(goal.workout)
        const workout = await Workout.findById(workout_id)
        var workouts = []
        workouts = await promisesWorkout(workout.exercises)
        res.json(workouts)
    }
    else res.json({})
})


const getGoalWorkout = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const goal = await Goal.findOne({ user: _id })
    if (goal) {
        const workout_id = ObjectId(goal.workout)
        const workout = await Workout.findById(workout_id)
        var workouts = []
        workouts = await promisesWorkout(workout.exercises)
        const retObject = {
            exercises: workouts,
            name: workout.name
        }
        res.json(retObject)
    }
    else res.json({})
})

const getGoalDiet = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const goal = await Goal.findOne({ user: _id })
    if (goal) {
        const diet_id = ObjectId(goal.diet)
        const diet = await Diet.findById(diet_id)
        var foodName = []
        foodName = await promisesDiet(diet.food)
        const retObject = {
            food: foodName,
            name: diet.name
        }
        res.json(retObject)
    }
    else res.json({})
})

export { getWorkouts, getDiets, saveGoal, getUserGoal, getFoodList, getWorkoutList, getGoalWorkout, getGoalDiet, deleteGoal }