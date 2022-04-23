import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {
        res.json(
            {
                _id: user._id,
                name: user.nane,
                email: user.email,
                token: generateToken(user._id)
            }
        )
    } else {
        res.status(401).json({ message: "Invalid Email or Password" })
    }

})


//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {

    res.json({ message: 'Success' })
})

//@desc   Get users
//@route  Get /api/products
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@desc   Get user by ID
//@route  Get /api/products/:id
//@access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    }
    else {
        res.status(404).json({ message: "User not found " })
    }
})

export {
    authUser,
    getUsers,
    getUserById,
    getUserProfile
}