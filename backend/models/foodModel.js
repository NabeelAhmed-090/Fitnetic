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
    benefit: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    unit: {
        type: String,
        required: true,
        default: "grams"
    }
})

const Food = mongoose.model('Food', foodSchema)

export default Food