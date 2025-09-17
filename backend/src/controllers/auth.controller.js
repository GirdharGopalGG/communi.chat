import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import { sendWelcomeEmail } from "../lib/resend.js"



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

            try {
                sendWelcomeEmail(newUser.email,newUser.fullName,process.env.client_Url)
            } catch (error) {
                console.log("failed to send welcome email\n", error)
            }
        }
        
    } catch (error) {
        console.error( "Error in signup controller \n", error)
        res.status(500).json({
          message:"Internal server error"
        })
    }
}