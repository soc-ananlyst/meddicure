import mongoose from 'mongoose'

let connectionPromise

mongoose.connection.on('connected', () => {
    console.log('[+] Database connected successfully')
})

mongoose.connection.on('disconnected', () => {
    connectionPromise = undefined
})

const connectMongoDB = async () => {
    const mongoUri = process.env.MONGODB_URI ?? process.env.MONGODB

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not configured')
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongoUri, { dbName: 'doctor' }).catch((error) => {
            connectionPromise = undefined
            throw error
        })
    }

    return connectionPromise
}

export default connectMongoDB