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
    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Food'
        }
    ],
    totalCaloriesCount: {
        type: Number,
        required: true
    }
})

const Diet = mongoose.model('Diet', dietSchema)

export default Diet