import asyncHandler from "express-async-handler";
import Admin from '../models/adminModel.js'
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("Login verification : ", email, password)

    const admin = await Admin.findOne({ email: email }) //user or null
    if (admin && (await admin.matchPassword(password))) {
        res.json(
            {
                _id: admin._id,
                email: admin.email,
            }
        )
    } else {
        res.status(401).json({ message: "Invalid Email or Password" })
    }
})

const getUser = asyncHandler(async (req, res) => {
    const users = await User.find({})
    const userList = users.map((i) => {
        return (
            {
                email: i.email,
                name: i.name
            }
        )
    })
    res.json(userList)
})



export { authUser, getUser }