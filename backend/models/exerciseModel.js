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
export default Exercise