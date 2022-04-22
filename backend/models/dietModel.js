import mongoose from "mongoose";


const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
})

const Food = mongoose.model('Food', foodSchema)


const dietSchema = mongoose.Schema({
    exercises: [Exercise],
    totalCaloriesCount: {
        type: Number,
        required: true
    }
})

const Diet = mongoose.model('Diet', dietSchema)

export default Diet