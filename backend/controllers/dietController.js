import asyncHandler from "express-async-handler";
import Food from '../models/foodModel.js';
import Diet from '../models/dietModel.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';


const getFood = asyncHandler(async (req, res) => {
    const data = await Food.find()
    const food = data.map((i) => {
        return {
            id:i.id,
            name: i.name,
            calories: i.calories,
            quantity:i.quantity
        }
    })
    res.json(
        food
    )
})

const addDiet = asyncHandler(async (req, res) => {
    const { foodList, totalCaloriesCount, name } = req.body
    const food = foodList.map(i => {
        return i._id
    })
    const newDiet=await Diet.create({
        food,
        totalCaloriesCount,
        name
    })
    res.json(
        newDiet
    )
})

const deleteDiet=asyncHandler((req, res)=>{
    const { name } = req.body

    Diet.deleteOne({ name: name })
        .then(() => {
            res.send("Diet Deleted")
        })
        .catch((error) => {
            res.send("Error in Diet deletion")
        })

})

const getDiets = asyncHandler(async (req, res) => {
    const diets = await Diet.find({})
    const dietList = diets.map((i) => {
        return (
            {
                name: i.name,
            }
        )
    })
    res.json(dietList)
})
export {getFood, addDiet, deleteDiet, getDiets} 