import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import {create} from 'zustand'

export const useAuthStore = create((set)=>({

    authUser: null,
    isLoginChecked: false,

    isSigningUp:false,
        

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

    // signUp: async (data)=>{
    //     set({isSigningUp: true})

    //     try {
    //         const res = await axiosInstance.post('/auth/signup',data)
    //         set({authUser: res.data})
            
            
    //         toast.success('Account created successfully')
            
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || 'No response from server. Check your connection.')

    //         console.error('Error in signUp function in AuthStore\n',error.message)
    //     } finally {
    //         set({isSigningUp: false})

    //     }
        
    // }

    signUp: async (data)=>{
    set({isSigningUp: true})

    try {
        const res = await axiosInstance.post('/auth/signup',data)
        set({authUser: res.data})
        
        toast.success('Account created successfully')
        
    } catch (error) {
        // Check if error.response exists before accessing it
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            toast.error(error.response.data.message)
        } else if (error.request) {
            // Request made but no response received
            toast.error('No response from server. Check your connection.')
        } else {
            // Error in request setup
            toast.error('Failed to send request')
        }
        console.error('Error in signUp function in AuthStore\n',error.message)
    } finally {
        set({isSigningUp: false})
    }
}

    
    
}))

