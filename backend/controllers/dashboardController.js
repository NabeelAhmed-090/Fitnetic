import Dashboard from "../models/dashboardModel.js";
import asyncHandler from "express-async-handler";

const getQuestions = asyncHandler(async (req, res) => {
    const data=await Dashboard.find()
    const questions=data.map((i)=>{
        return i.questions
    })
    res.json({
       questions:questions
    })
})
export {getQuestions}