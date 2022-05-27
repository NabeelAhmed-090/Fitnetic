import Diet from '../models/dietModel.js'
import Workout from '../models/workoutModel.js'
import Exercise from '../models/exerciseModel.js'
import Goal from '../models/goalModel.js'
import { ObjectId } from 'mongodb';


import asyncHandler from "express-async-handler";

async function promises(exercises) {
    const unresolved = exercises.map(async (obj) => {
        const exerciese = await Exercise.findById(obj)
        return exerciese.name
    })
    const exerciseName = await Promise.all(unresolved)
    return exerciseName
}

const getWorkouts = asyncHandler(async (req, res) => {
    // const { selectedTags } = req.body
    // const workouts = await Workout.find({})

    // const workoutsList = workouts.map((i) => {
    //     let check = false
    //     let itr = 0
    //     while (itr in i.tags && check == false) {
    //         for (let tag in selectedTags) {
    //             if (selectedTags[tag].match(i.tags[itr])) {
    //                 check = true
    //                 break
    //             }
    //         }
    //         itr += 1
    //     }
    //     if (check === true)
    //         return i
    // })

    // res.json(workoutsList)
    const { selectedTags } = req.body
    const workouts = await Workout.find({})

    const unresolved = workouts.map(async (i) => {
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
            const exerciseName = await promises(i.exercises)
            return (
                {
                    exercises: exerciseName,
                    name: i.name,
                    calories: i.totalCaloriesCount,
                    id: i._id
                }
            )
        }
    })

    const workoutsList = await Promise.all(unresolved)

    res.json(workoutsList)
})

const getDiets = asyncHandler(async (req, res) => {
    const { selectedTags } = req.body

    const diets = await Diet.find({})

    const dietsList = diets.map((i) => {
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
        if (check == true)
            return i
    })

    res.json(dietsList)
})


const saveGoal = asyncHandler(async (req, res) => {
    const { userID, dietID, workoutID } = req.body
    const user_id = ObjectId(userID)
    const workout_id = ObjectId(workoutID)
    const diet_id = ObjectId(dietID)
    const goal = await Goal.findOne({ user: user_id })
    if (goal) {
        goal.diet = diet_id
        goal.workout = workout_id
        const updatedGoal = await goal.save()
        res.json(updatedGoal)
    } else {
        const newGoal = new Goal({
            user: user_id,
            diet: diet_id,
            workout: workout_id,
        })
        await Goal.create(newGoal)
        res.json(newGoal)
    }
})




export { getWorkouts, getDiets, saveGoal }