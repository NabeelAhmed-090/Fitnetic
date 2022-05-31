import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

adminSchema.methods.matchPassword = async function (enteredPassword) {
    const check = await bcrypt.compare(enteredPassword, this.password)
    return check
}


const Admin = mongoose.model('Admin', adminSchema)


export default Admin