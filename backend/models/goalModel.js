import mongoose from "mongoose";


const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goalBenefits: {
        type: String,
        required: true
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
})

const Goal = mongoose.model('Goal', goalSchema)

export default Goal