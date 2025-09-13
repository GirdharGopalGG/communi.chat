import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body

    try {
        
        const hashedPassword = await bcrypt.hash(password,8) 
        
        const newUser = new userModel({
            fullName,
            email,
            password:hashedPassword
        })

        const userExists = await userModel.findOne(email)

        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        if(newUser){
            genereateToken()
            await newUser.save()

            res.status(201).json({
                newUser
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message:"error while signing up", error
        })
    }
}