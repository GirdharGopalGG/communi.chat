import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import  toast  from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isMessageLoading: false,
    isUserLoading:false,

    isSoundEnabled: localStorage.getItem('sound') === true? true:false,

    toggleSound: ()=>{
       localStorage.setItem('sound',!get().isSoundEnabled)
       set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab})
    },

    setSelectedUser: (user)=>{
        set({ selectedUser:user })
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
            toast.error('Error fetching users')
            console.error('Error in getChatPartners in useChatStore',error.message)
        }finally{
            set({
                isUserLoading:false
            })
        }
    }

}))