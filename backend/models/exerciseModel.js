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
    reps: {
        type: Number,
        required: true,
        default: 1
    },
    sets: {
        type: Number,
        required: true,
        default: 1
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
export default Exercise