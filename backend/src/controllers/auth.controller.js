import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body

    try {
        
        const hashedPassword = await bcrypt.hash(password,8) 
        
        const newUser = new userModel({
            fullName,
            email,
            password:hashedPassword
        })

        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        if(newUser){
            await newUser.save()
            generateToken(newUser._id,res)

            res.status(201).json({
                newUser
            })
        }
        
    } catch (error) {
        console.log( "Error in signup controller \n", error)
        res.status(500).json({
          message:"Internal server error"
        })
    }
}