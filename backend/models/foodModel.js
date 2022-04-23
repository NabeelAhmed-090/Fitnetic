import mongoose from "mongoose"


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

export default Food