import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profilePic:{
        type:String,
        default:''
    }
},{
    timestamps:true
})

export const userModel = mongoose.model('user',userSchema)