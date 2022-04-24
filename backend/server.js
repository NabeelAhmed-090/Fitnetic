import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

// app.use(cors())

app.use(express.json())

app.use('/api/users', userRoutes)

app.use("*", (req, res) => {
    res.send("Page not found!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))