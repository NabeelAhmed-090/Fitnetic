<<<<<<< HEAD

import express from "express";
const router = express.Router()
import { getDiet, getFood, addDiet } from '../controllers/dietController.js'

router.get('/data', getDiet)
router.post('/add', addDiet)
router.get('/food', getFood)

=======
import express from "express";
const router = express.Router()
import { getFood, addDiet, getDiets, deleteDiet} from '../controllers/dietController.js'

router.get('/food', getFood)
router.post('/add', addDiet)
router.delete('/delete', deleteDiet)
router.get('/data', getDiets)
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
export default router