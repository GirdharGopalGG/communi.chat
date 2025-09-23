import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'

export const authMiddleware = async(req,res,next)=>{

    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({
            message:'Unauthorized - token not found'
        })
        }
        
        const decodedJwt = jwt.verify(token,process.env.jwt_secret)
        
        if(!decodedJwt){
            return res.status(401).json({
                message:'Unauthorized - token invalid'
            })
        }
        
        const user = await userModel.findById(decodedJwt.userId).select('-password')
        
        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        }
        
        req.user = user
        next()

    }catch(error){
        console.log('Error in auth middleware\n',error)
        res.status(500).json({
            message:'Internal server error'
        })
    }
}