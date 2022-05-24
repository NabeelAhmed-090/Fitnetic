
import express from "express";
const router = express.Router()
import { getDiet, getFood, addDiet } from '../controllers/dietController.js'

router.get('/data', getDiet)
router.post('/add', addDiet)
router.get('/food', getFood)

export default router