import mongoose from "mongoose";

const connectDB = async () => {
    try {   
        console.log(process.env.MONOG_URI)

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB