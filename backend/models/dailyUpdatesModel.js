import mongoose from "mongoose";


const dailyUpdatesSchema = mongoose.Schema({
    food: [
        {
            foodName: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Food'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    workout: [
        {
            exerciseName: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Exercise'
            },
            setsXreps: {
                type: Number,
                required: true
            }
        }
    ],
})

const DailyUpdates = mongoose.model('DailyUpdates', dailyUpdatesSchema)

export default DailyUpdates