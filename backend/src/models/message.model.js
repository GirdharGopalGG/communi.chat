import mongoose, { mongo } from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    text:{
        type:String,
        trim: true,
        maxLength: 1000
    },

    image:{
        type:String
    }

},{timestamps:true})

export const messageModel = mongoose.model('message',messageSchema)