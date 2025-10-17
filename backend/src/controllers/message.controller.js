import { messageModel } from "../models/message.model.js"
import { userModel } from "../models/user.model.js"
import cloudinary from '../lib/cloudinary.js'


export const getMessageByUserId = async(req, res)=>{
    try{
        const myId = req.user._id
        const { id: userToChatId } = req.params;
        
        const chats = await messageModel.find({
            $or:[
                { senderId: userToChatId, receiverId: myId},
                { senderId: myId, receiverId: userToChatId},
            ]
        })
        res.status(200).json(chats)
        
    }catch(error){
        console.error('Error in getMessageByUserId controller\n',error)
        res.status(500).json({message:'Internal server error'})
    }
}

export const getAllContacts = async(req, res)=>{
    try{
        const loggedInUser = req.user._id
        const filteredUsers = await userModel.find({_id:{$ne: loggedInUser}}).select('-password')
        res.status(200).json(filteredUsers)
        
    }catch(error){
        console.error('Error in getAllContacts message controller\n',error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage = async(req, res)=>{
    try{
        const senderId = req.user._id
        const receiverId = req.params.id
        const {text, image} = req.body

        if(!text && !image){
            return res.status(400).json({message: "Enter a message"})
        }

        const receiverExists = await userModel.exists({_id: receiverId})
        if(!receiverExists){
            return res.status(404).json({
                message: "Receiver not found"
            })
        }
        
        let imageUrl
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new messageModel({
            text,
            image: imageUrl,
            senderId,
            receiverId
        })

        await newMessage.save()

        //TODO: SEND MESSAGE IN REAL TIME (SOCKET.IO)

        res.status(201).json(newMessage)
        
    }catch(error){
        console.error('Error in sendMessage controller\n',error)
        res.status(500).json({message:"Internal server error"})
    }
    
}

export const getChatPartner = async(req, res)=>{
    try{    

        const loggedInUserId = req.user._id
        const messages = await messageModel.find({
            $or:[
                {senderId: loggedInUserId},
                {receiverId: loggedInUserId}
            ]
        }) ?? []

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(200).json([]) // no chat partners
        }
        
        const chatPartnerIds = messages.map((m)=>
                m.senderId.toString() === loggedInUserId.toString()
                    ? m.receiverId.toString()
                    : m.senderId.toString()
        )

        const uniqueIds = [...new Set(chatPartnerIds)]

        const chatPartners = await userModel.find({
            _id: {$in: uniqueIds}
        }).select('-password')
        
        res.status(200).json(chatPartners)

        
    }catch(error){
        console.error('Error in getChatPartner controller\n',error.message)
        res.status(500).json({message:'Internal server error'})
    
    }
}