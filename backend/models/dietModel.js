import mongoose from "mongoose";

const dietSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    food: [
        {
            foodName: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Food'
            },
            quantity: {
                type: String,
                required: true,
                default: 1
            }
        }
    ],
    totalCaloriesCount: {
        type: Number,
        required: true
    },
    tags: [
        {
            type: String,
        }
    ],
})

const Diet = mongoose.model('Diet', dietSchema)

export default Diet