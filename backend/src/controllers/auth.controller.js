import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/jwt.cookie.js"
import { sendWelcomeEmail } from "../lib/resend.js"
import {v2 as cloudinary} from 'cloudinary'


export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body

    try {
        
        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.status(409).json({
                message:"User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,8) 
        
        const newUser = new userModel({
            fullName,
            email,
            password:hashedPassword
        })


        if(newUser){
            await newUser.save()
            generateToken(newUser._id,res)

            res.status(201).json({
                newUser
            })

            try {
                sendWelcomeEmail(newUser.email,newUser.fullName,process.env.client_url)
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

export const login = async(req, res)=>{
    const {email, password} = req.body
    
    try{
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = generateToken(user._id,res)
    res.status(200).json(token)
    }
    catch(error){
        console.error("Error in login controller\n", error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
    
}

export const logout = async(req,res)=>{
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({
        message:"Logged out"
    })
}

//REVIEW LEFT 

export const updateProfile = async(req,res)=>{
    try{
    const { profilePic } = req.body
    if(!profilePic){
        return res.status(401).json({
            message:'Profile pic is required'
        })
    }
    const userId = req.user._id
    const uploadedImage = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await userModel.findByIdAndUpdate(
                            userId,
                            {profilePic:uploadedImage.secure_url}, 
                            {new:true}
                        ).select('-password')
        
    res.status(200).json({
        message:"Profile pic updated"
    },updatedUser)  //TRYING STH NEW
    }
    catch(error){
        console.log("Error in updating profile image in auth controller\n",error)
        res.status(500).json({
            message:'Internal server error'
        })
    }                      
}
