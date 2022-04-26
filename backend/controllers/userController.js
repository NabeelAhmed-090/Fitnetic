import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("Login verification : ", email, password)

    const user = await User.findOne({ email: email }) //user or null
    if (user && (await user.matchPassword(password))) {
        res.json(
            {
                _id: user._id,
                name: user.name,
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
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
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
    console.log("Register User")
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
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


//@desc   Update Users
//@route  POST /api/users/settings
//@access Private
const updateUser = asyncHandler(async (req, res) => {

    var { name, age, weight, password, height, image, email } = req.body

    const user = await User.findOne({ email })
    if (user) {
        if (name.length === 0)
            name = user.name
        if (age === 0)
            age = user.age
        if (weight === 0)
            weight = user.weight
        if (height === 0)
            height = user.height
        if (image.length === 0)
            image = user.image
        if (password.length === 0) {
            password = user.password
        }
        else {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)
        }

        const updateUser = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    name: name,
                    age: age,
                    password: password,
                    weight: weight,
                    email: email,
                    height: height,
                    image: image
                }
            }
        )
        res.json({
            _id: updateUser._id,
            name: name,
            email: updateUser.email,
            token: generateToken(updateUser._id)
        })
    }
    else {
        res.status(404).json({ message: 'User not found' })
    }
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUser,
}