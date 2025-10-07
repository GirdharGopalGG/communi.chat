import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'
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
            set({authUser: null, })
        }finally{
            set({isLoginChecked: true})
        }
    },

    signUp: async (data)=>{

        try {
            set({isSigningUp: true})
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser: res.data})
            
            //TOAST

            toast.success('Account created successfully')
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.error('Error in signUp function in AuthStore\n',error.message)
        } finally {
            set({isSigningUp: false})

        }
        
    }
    
    
}))

