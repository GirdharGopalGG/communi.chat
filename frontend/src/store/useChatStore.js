import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import  toast  from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    allContacts: [],
    chats: [],
    messages:[],
    activeTab: "chats",
    selectedUser: JSON.parse(localStorage.getItem('selectedUser')) || null,
    isMessageLoading: false,
    isUserLoading:false,
    isSoundEnabled: JSON.parse(localStorage.getItem('sound')) === true? true:false,

    toggleSound: ()=>{
       localStorage.setItem('sound',!get().isSoundEnabled)
       set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab})
    },

    setSelectedUser: (user)=>{
        localStorage.setItem('selectedUser',JSON.stringify(user))
        set({ selectedUser:user })
        console.log('setSelectedUser func in useChatStore ran ')
    },

    getAllContacts: async()=>{
        set({
            isUserLoading:true
        })
        try{
            const res = await axiosInstance.get('/message/contacts')
            set({
                allContacts:res.data
            })
        }
        catch(error){
            toast.error('Error fetching all contacts')
            console.error('Error in getAllContacts fn in useChatStore',error.message)
        }
        finally{
            set({
                isUserLoading:false
            })
        }
    },

    getChatPartners: async() =>{
        set({
            isUserLoading: true
        })
        try{
            const res = await axiosInstance.get('/message/chats')
            set({
                chats: res.data
            })  
        }catch(error){
            toast.error('Error fetching chat partner')
            console.error('Error in getChatPartners in useChatStore',error.message)
        }finally{
            set({
                isUserLoading:false
            })
        }
    },

    getMessageByUserId: async(userId)=>{
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages: res.data})
        } catch (error) {
            toast.error('Error fetching messages')
            console.error('Error in getMessageByUserId in chat store\n',error.message)
        }finally{
            set({isMessageLoading:false})
        }
        
    },

    sendMessage: async(messageData) =>{
        
        const {selectedUser,messages} = get()
        
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages: messages.concat(res.data)})
        } catch (error) {
            set({messages:messages})
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

}))