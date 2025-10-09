import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import {create} from 'zustand'

export const useAuthStore = create((set)=>({

    authUser: null,
    isLoginChecked: false,

    isSigningUp:false,
    isLoggingUp:false,
        

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data, })

        } catch (error) {
            console.error('Error in checkAuth in useAuthStore\n',error.message)
            set({authUser: null })
        }finally{
            set({isLoginChecked: true})
        }
    },

    signUp: async (data)=>{
        set({isSigningUp: true})

        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser: res.data})
            
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
            toast.success('You are logged in')

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
            toast.success('Logged out')
        } catch (error) {
            toast.error('Error logging out')
            console.error('Error in Logout function in useAuthStore',error.message)
        }
    }    
    
}))

