import Diet from '../models/dietModel.js'
import Workout from '../models/workoutModel.js'
import Goal from '../models/goalModel.js'
import { ObjectId } from 'mongodb';


import asyncHandler from "express-async-handler";

const getWorkouts = asyncHandler(async (req, res) => {
    const { selectedTags } = req.body
    const workouts = await Workout.find({})

    const workoutsList = workouts.map((i) => {
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
        if (check === true)
            return i
    })

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
    console.log(user_id, diet_id, workout_id)
    const goal = await Goal.findOne({ user: user_id })
    if (goal) {
        goal.diet = diet_id
        goal.workout = workout_id
        const updatedGoal = await goal.save()
        res.json(updatedGoal)
    } else {
        const newGoal = await Goal.create({
            user_id,
            diet_id,
            workout_id,
        })
        res.json(newGoal)
    }
})




export { getWorkouts, getDiets, saveGoal }