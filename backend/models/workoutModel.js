import mongoose from "mongoose";



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