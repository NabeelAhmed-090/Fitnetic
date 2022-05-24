import Diet from '../models/dietModel.js'
import Workout from '../models/workoutModel.js'

import asyncHandler from "express-async-handler";

const getWorkouts = asyncHandler(async (req, res) => {
    const { tags } = req.body
    const workouts = await Workout.find({})

    const workoutsList = workouts.map((i) => {
        let check = false
        let itr = 0
        while (itr in i.tags && check == false) {
            for (let tag in tags) {
                if (tags[tag].match(i.tags[itr])) {
                    check = true
                    break
                }
            }
            itr += 1
        }
        if (check == true)
            return i
    })

    res.json(workoutsList)
})

const getDiets = asyncHandler(async (req, res) => {
    const { tags } = req.body

    const diets = await Diet.find({})

    const dietsList = diets.map((i) => {
        let check = false
        let itr = 0
        while (itr in i.tags && check == false) {
            for (let tag in tags) {
                if (tags[tag].match(i.tags[itr])) {
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


export { getWorkouts, getDiets }