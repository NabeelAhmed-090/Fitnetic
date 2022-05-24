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
<<<<<<< HEAD
    tags: [
        {
            type: String,
        }
    ],
=======
    name: {
        type: String,
        required: true
    }
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
})

const Diet = mongoose.model('Diet', dietSchema)

export default Diet