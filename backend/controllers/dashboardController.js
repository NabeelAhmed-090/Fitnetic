import Dashboard from "../models/dashboardModel.js";
import asyncHandler from "express-async-handler";
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const getQuestions = asyncHandler(async (req, res) => {
    const data=await Dashboard.find()
    
    const questions=data.map((i)=>{
        return{
            questions:i.questions,
            _id:i._id
        } 
    })
    res.json(
       questions
    )
})

const getAnswers = asyncHandler(async (req, res) => {
    
    var id=req.params.id;
    if (id.length==25)
        id=id.slice(0,-1);
    const _id=ObjectId(id)
    const data=await Dashboard.findById(_id)
    const {answer}=data
    res.json(
        answer
    )
})

const postQuestion=asyncHandler(async (req, res) => {
    
    var{questions}=req.body
    const answer=[]
    await Dashboard.create({
        questions,
        answer
    })
    res.json(
        {
            message:"question is successfully posted"
        }
    )
    res.end()
})

export {getQuestions, getAnswers, postQuestion}