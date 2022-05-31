import express from "express";
const router = express.Router()
import { getTrackingProgress } from '../controllers/trackingProgressController.js'

router.post('/user/data', getTrackingProgress)
export default router