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
    const user = await User.findById(req.user._id)
    console.log(user)
    if (user) {
        res.json({
            _id: user._id,
            name: user.nane,
            email: user.email,
        })
    }
    else {
        res.status(404).json({ message: "User not found" })
    }
    res.json({ message: 'Success' })
})

//@desc   Get users
//@route  Get /api/products
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, age, password, weight, email, height, image } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
        name,
        age,
        password,
        weight,
        email,
        height,
        image
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.nane,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


export {
    authUser,
    registerUser,
    getUserProfile
}