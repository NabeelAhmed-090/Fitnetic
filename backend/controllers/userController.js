import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import TrackingProgress from "../models/trackingProgressModel.js";
import generateToken from "../utils/generateToken.js";
import DailyUpdates from "../models/dailyUpdatesModel.js";
import { ObjectId } from 'mongodb';
import Goal from '../models/goalModel.js'

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
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        )
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const user = await User.findById(_id)
    if (user) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                height: user.height,
                weight: user.weight
            })
    }
    else {
        res.status(404).json({ message: "User not found" })
    }
})

//@desc   Get users
//@route  Get /api/products
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, age, password, weight, email, height } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        age,
        password,
        weight,
        email,
        height,
    })

    if (user) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


//@desc   Update Users
//@route  PUT /api/users/settings
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    var { name, age, weight, password, height, email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (name.length !== 0)
            user.name = name
        if (age !== 0)
            user.age = age
        if (weight !== 0)
            user.weight = weight
        if (height !== 0)
            user.height = height
        if (password.length !== 0)
            user.password = password

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
        })
    }
    else {
        res.status(404).json({ message: 'User not found' })
    }
})


async function deleteDailyUpdates(dailyUpdates) {
    const unresolved = dailyUpdates.map(async (i) => {
        const id = ObjectId(i)
        await DailyUpdates.deleteOne({ _id: id })
    })
    await Promise.all(unresolved)
}


//@desc   Delete User
//@route  DELETE /api/users/profile/delete
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    const goal = await Goal.findOne({ user: user._id })
    if (goal) {
        await Goal.deleteOne({ user: user._id })
        const _tp = await TrackingProgress.findOne({ user: user._id })
        const { dailyUpdates } = _tp
        if (dailyUpdates) {
            await deleteDailyUpdates(dailyUpdates)
        }
        await TrackingProgress.deleteOne({ user: user._id })
    }
    await User.deleteOne({ _: user._id })
})




const verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email }) //user or null
    if (user) {
        res.json(
            {
                check: true,
            }
        )
    } else {
        res.json(
            {
                check: false,
            }
        )
    }
})


const dailyUpdate = asyncHandler(async (req, res) => {
    const { d_list, w_list, _id } = req.body
    const user_id = ObjectId(_id)
    const progress = await TrackingProgress.findOne({ user: user_id }) //user or null
    if (progress) {
        const DU = new DailyUpdates({
            food: d_list,
            workout: w_list,
        })
        await DailyUpdates.create(DU)
        progress.dailyUpdates = [...progress.dailyUpdates, DU._id]
        await progress.save()
        res.json(progress)
    }
    else {
        res.json({ message: "Error in finding object" })
    }
})


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    verifyEmail,
    dailyUpdate
}

