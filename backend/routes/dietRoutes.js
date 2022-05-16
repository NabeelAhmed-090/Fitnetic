import express from "express";
const router = express.Router()
import { getFood, addDiet, getDiets, deleteDiet} from '../controllers/dietController.js'

router.get('/food', getFood)
router.post('/add', addDiet)
router.delete('/delete', deleteDiet)
router.get('/data', getDiets)
export default router