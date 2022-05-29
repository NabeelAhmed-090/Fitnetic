import mongoose from "mongoose";
import User from '../models/userModel.js'
import Diet from '../models/dietModel.js'
import Workout from '../models/workoutModel.js'


const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    diet: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Diet'
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Workout'
    },
    days: {
        type: Number,
        required: true,
        default: 30
    }
})

const Goal = mongoose.model('Goal', goalSchema)

export default Goal