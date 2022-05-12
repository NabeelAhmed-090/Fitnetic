import asyncHandler from "express-async-handler";
import Admin from '../models/adminModel.js'
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

export { authUser }