import mongoose from "mongoose";


const dashboardSchema = mongoose.Schema({
    questions: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    },
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)

export default Dashboard