import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'

dotenv.config()

const port = process.env.port
const app = express()

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})