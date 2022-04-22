import mongoose from "mongoose";


const dailyUpdatesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    foodIntake: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Food'
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Workout'
    },
})

const DailyUpdates = mongoose.model('DailyUpdates', dailyUpdatesSchema)

export default DailyUpdates