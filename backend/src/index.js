import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import path from 'path'
import { connectDB } from './lib/db.js'

dotenv.config()

const port = process.env.PORT
const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

//for deployment on sevalla
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))    

    app.get("/*splat",(_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
    connectDB()
})