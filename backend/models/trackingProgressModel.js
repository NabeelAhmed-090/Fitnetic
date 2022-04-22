import mongoose from "mongoose";


const trackingProgressSchema = mongoose.Schema({
    dailyUpdates:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'DailyUpdates'
            }
        ],
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Goal'
    },
    inactiveDays: {
        type: Number,
        required: true,
        default: 0
    },
})

const TrackingProgress = mongoose.model('TrackingProgress', trackingProgressSchema)

export default TrackingProgress