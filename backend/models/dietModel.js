import mongoose from "mongoose";

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