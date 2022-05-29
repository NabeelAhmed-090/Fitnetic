import mongoose from "mongoose";


const trackingProgressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dailyUpdates:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'DailyUpdates'
            }
        ],
})

const TrackingProgress = mongoose.model('TrackingProgress', trackingProgressSchema)

export default TrackingProgress