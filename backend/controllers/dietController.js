<<<<<<< HEAD
import Diet from '../models/dietModel.js'
import asyncHandler from "express-async-handler";
import Food from '../models/foodModel.js';
=======
import asyncHandler from "express-async-handler";
import Food from '../models/foodModel.js';
import Diet from '../models/dietModel.js';
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';


const getFood = asyncHandler(async (req, res) => {
    const data = await Food.find()
    const food = data.map((i) => {
        return {
<<<<<<< HEAD
            name: i.name,
            calories: i.calories,
            _id: i._id,
            benefit: i.benefit
=======
            id:i.id,
            name: i.name,
            calories: i.calories,
            quantity:i.quantity
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
        }
    })
    res.json(
        food
    )
})

const addDiet = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const { diet, totalCaloriesCount, tags, name } = req.body
    const food = diet.map(i => {
        return i._id
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
=======
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
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
        return (
            {
                name: i.name,
            }
        )
    })
    res.json(dietList)
})
<<<<<<< HEAD


export { getFood, getDiet, addDiet }
=======
export {getFood, addDiet, deleteDiet, getDiets} 
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
