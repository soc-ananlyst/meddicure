import mongoose from 'mongoose'

const connectMongoDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log(`[+] Database connected succesfully...`)
    })
    if (!process.env.MONGODB) {
        console.warn('[!] MONGODB is not set; skipping database connection')
        return
    }
    try {
        await mongoose.connect(`${process.env.MONGODB}/doctor`)
    } catch (error) {
        console.error('[!] Database connection failed:', error.message)
    }
}

export default connectMongoDB
