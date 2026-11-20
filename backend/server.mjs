import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectMongoDB from './config/mongodb.mjs'
import routes from './routes/index.mjs'
import passport from 'passport'
import connectV2 from './config/cloudinary.mjs'
import swaggerSpec from './utils/swagger.mjs'
import swaggerUi from 'swagger-ui-express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()
const mongoUri = process.env.MONGODB_URI ?? process.env.MONGODB
app.set('trust proxy', 1)
connectV2()
app.use(cors())
app.use(express.json())

app.use(async (request, response, next) => {
    try {
        await connectMongoDB()
        next()
    } catch (error) {
        console.error('Database connection failed:', error.message)
        response.status(503).json({ success: false, message: 'Database unavailable' })
    }
})

const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL)

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: mongoUri,
        dbName: 'doctor',
        collectionName: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 360000,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)


app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


/*
server.listen(process.env.PORT,()=>{
    console.log(`[+] Server running on port : ${process.env.PORT}`)
})
*/

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Local server listening on ${port}`))
}

export default app