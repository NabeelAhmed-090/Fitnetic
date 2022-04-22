import mongoose from "mongoose";


const exerciseSchema = mongoose.Schema({
    suggestedTime: {
        type: String,
        required: true,
    },
    actualTime: {
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true,
    },
    benefit: {
        type: String,
        required: true,
    },
    caloriesBurnt: {
        type: Number,
        required: true,
    },
})

const Exercise = mongoose.model('Exercise', exerciseSchema)


const workoutSchema = mongoose.Schema({
    exercises: [Exercise],
    totalCaloriesCount: {
        type: Number,
        required: true
    }
})

const workout = mongoose.model('Workout', workoutSchema)

export default Workout