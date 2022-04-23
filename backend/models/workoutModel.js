import mongoose from "mongoose";


const exerciseSchema = mongoose.Schema({
    suggestedTime: {
        type: Number,
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
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Exercise'
        }
    ],
    totalCaloriesCount: {
        type: Number,
        required: true
    }
})

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout