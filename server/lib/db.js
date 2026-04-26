import mongoose from 'mongoose'
import dbgr from 'debug'
const log = dbgr("development:db")

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            log("Database connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/addakhana`)
    } catch (error) {
        log(error.message)
    }
}