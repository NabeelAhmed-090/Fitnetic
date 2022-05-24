import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
<<<<<<< HEAD
import goalRoutes from './routes/goalRoutes.js'
import dietRoutes from './routes/dietRoutes.js'

=======
import dietRoutes from './routes/dietRoutes.js'
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

// app.use(cors())

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/workout', workoutRoutes)
app.use('/api/diet', dietRoutes)
<<<<<<< HEAD
app.use('/api/goal', goalRoutes)

=======
>>>>>>> 952d75478d08de4b56f5ca139ecee6c14259841b

app.use("*", (req, res) => {
    res.send("Page not found!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))