import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        Unique: true
    },
    height: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)

export default User