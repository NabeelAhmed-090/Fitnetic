import mongoose from "mongoose";


const dashboardSchema = mongoose.Schema({
    questions: {
        type: String,
        required: true
    },
    answer: [
        String
    ],
    user: {
        type: String,
        required: true,
    }
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)

export default Dashboard