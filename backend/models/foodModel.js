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
    }
})

const Food = mongoose.model('Food', foodSchema)

export default Food