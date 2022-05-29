import Diet from '../models/dietModel.js'
import asyncHandler from "express-async-handler";
import Food from '../models/foodModel.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';


const getFood = asyncHandler(async (req, res) => {
    const data = await Food.find()
    const food = data.map((i) => {
        return {
            name: i.name,
            calories: i.calories,
            _id: i._id,
            benefit: i.benefit,
            quantity: i.quantity,

        }
    })
    res.json(
        food
    )
})

const addDiet = asyncHandler(async (req, res) => {
    const { diet, totalCaloriesCount, tags, name } = req.body
    const food = diet.map(i => {
        return (
            {
                foodName: i._id,
                quantity: i.quantity,
            }
        )
    })
    await Diet.create({
        name,
        food,
        totalCaloriesCount,
        tags
    })

    res.json(
        {
            message: "Diet Added"
        }
    )
})


const getDiet = asyncHandler(async (req, res) => {
    const diet = await Diet.find({})
    const dietList = diet.map((i) => {
        return (
            {
                name: i.name,
            }
        )
    })
    res.json(dietList)
})


export { getFood, getDiet, addDiet }
