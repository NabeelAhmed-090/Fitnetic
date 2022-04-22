import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin