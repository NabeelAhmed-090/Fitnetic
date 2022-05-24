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
<<<<<<< HEAD
    benefit: {
        type: String,
        required: true
    }
=======
    quantity: {
        type: Number,
        default:0,
        required: true,
    },
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
})

const Food = mongoose.model('Food', foodSchema)

export default Food