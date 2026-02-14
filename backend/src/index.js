import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import path from 'path'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

// const port = process.env.PORT || 3000
// const __dirname = path.resolve()

const app = express()
connectDB()

app.use(cors({origin:true, credentials:true}))

app.use(express.json({limit : '5mb'}))
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter) 


// //for deployment on sevalla
// if(process.env.node_env === 'production'){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))    

//     app.get("/*splat",(_,res)=>{
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
//     })
// }

// app.listen(port,()=>{
//     console.log(`Server running on port ${port}`)
//     connectDB()
// })

export default app;