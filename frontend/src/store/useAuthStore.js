import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import {create} from 'zustand'
import { useChatStore } from './useChatStore'

export const useAuthStore = create((set, get)=>({

    authUser: null,
    isLoginChecked: false,

    isSigningUp:false,
    isLoggingUp:false,
    isPicLoading:true,
        

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data, })

        } catch (error) {
            console.error('Error in checkAuth in useAuthStore\n',error.message)
            set({authUser: null })
        }finally{
            set({isLoginChecked: true, isPicLoading:false})
        }
    },

    signUp: async (data)=>{
        set({isSigningUp: true})

        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser: res.data})
            await get().checkAuth()
            toast.success('Account created')
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'No response from server. Check your connection.')
            console.error('Error in signUp function in AuthStore\n',error.message)

        } finally {
            set({isSigningUp: false})
        }
    },

    login: async(data)=>{
        set({isLoggingUp:true})

        try{
            
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            await get().checkAuth()
            toast.success('Logged In')

        }catch(error){
            toast.error(error.response?.data?.message)
            console.error('Error in Login function in AuthStore\n',error.message)
            
        }finally{
            set({isLoggingUp:false})
        }
    },


    logout: async()=>{
        try {
            await axiosInstance.post('/auth/logout')
            set({
                authUser:null
            })
            localStorage.removeItem('selectedUser')
            useChatStore.setState({ selectedUser: null })
            toast.success('Logged Out')
        } catch (error) {
            toast.error('Error logging out')
            console.error('Error in Logout function in useAuthStore\n',error.message)
        }
    },

    updateProfile: async(data)=>{
        try {
            const res = await axiosInstance.put('/auth/updateProfile', data)
            set({authUser : res.data})
            toast.success('Profile pic updated')
        } catch (error) {
            toast.error('Error updating Profile pic')
            console.error('Error in updateProfile\n',error.message)
        }
    }
    
}))

