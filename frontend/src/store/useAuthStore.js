import {axiosInstance} from '../lib/axios.js'
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser: null,
    isLoginChecked: false,

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
    }
}))

