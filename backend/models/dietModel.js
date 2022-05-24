import mongoose from "mongoose";

const dietSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    },
    tags: [
        {
            type: String,
        }
    ],
})

const Diet = mongoose.model('Diet', dietSchema)

export default Diet