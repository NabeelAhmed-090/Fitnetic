import mongoose from "mongoose";
import users from "./data/users.js"
import admins from "./data/admins.js";
import foods from "./data/food.js";
import exercises from "./data/exercises.js";
import dashboard from "./data/dashboard.js";
import workouts from "./data/workout.js";
import diets from "./data/diet.js";
import dotenv from 'dotenv'

import Admin from './models/adminModel.js'
import DailyUpdates from './models/dailyUpdatesModel.js'
import Dashboard from './models/dashboardModel.js'
import Diet from './models/dietModel.js'
import Food from './models/foodModel.js'
import Goal from './models/goalModel.js'
import TrackingProgress from './models/trackingProgressModel.js'
import User from './models/userModel.js'
import Workout from './models/workoutModel.js'
import Exercise from './models/exerciseModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Admin.deleteMany()
        await DailyUpdates.deleteMany()
        await Dashboard.deleteMany()
        await Diet.deleteMany()
        await Food.deleteMany()
        await Goal.deleteMany()
        await TrackingProgress.deleteMany()
        await User.deleteMany()
        await Workout.deleteMany()
        await Exercise.deleteMany()

        const exercisesList = await Exercise.insertMany(exercises)
        const exercisesIds = exercisesList.map((exercise) => {
            return exercise._id
        })
        const sampleWorkout = workouts.map((workout) => {
            return {
                ...workout,
                exercises: exercisesIds
            }
        })

        const foodList = await Food.insertMany(foods)
        const foodIds = foodList.map((food) => {
            return food._id
        })
        const sampleDiet = diets.map((diet) => {
            return {
                ...diet,
                food: foodIds
            }
        })

        await User.insertMany(users)
        await Admin.insertMany(admins)
        await Dashboard.insertMany(dashboard)
        await Workout.insertMany(sampleWorkout)
        await Diet.insertMany(sampleDiet)

        console.log("Data Imported")
        process.exit()
    } catch (error) {
        console.log(`Error in importing data : ${error}`)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Admin.deleteMany()
        await DailyUpdates.deleteMany()
        await Dashboard.deleteMany()
        await Diet.deleteMany()
        await Food.deleteMany()
        await Goal.deleteMany()
        await TrackingProgress.deleteMany()
        await User.deleteMany()
        await Workout.deleteMany()
        await Exercise.deleteMany()

        console.log("Data Destroyed")
        process.exit()
    } catch (error) {
        console.log(`Error in deleting data : ${error}`)
        process.exit(1)
    }
}


if (process.argv[2] == '-d') {
    destroyData()
}
else {
    importData()
}