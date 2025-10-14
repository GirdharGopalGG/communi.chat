import {Routes, Route, Navigate, } from 'react-router'

import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import LoadingPage from './components/LoadingPage.jsx'

import {Toaster} from 'react-hot-toast'


function App(){

const {authUser, checkAuth, isLoginChecked} = useAuthStore()

useEffect(()=>{
  checkAuth()
},[checkAuth])


if(!isLoginChecked){
  return <LoadingPage />
}
  
  return (
    
    <div className='relative overflow-hidden flex items-center h-screen justify-center bg-slate-900'>

      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />


      <Routes>
        <Route path= '/' 
        element= { authUser
        ? <ChatPage/> 
        : <Navigate to={"/login"}/> } 
        />
        <Route path= '/signup' 
        element = {authUser
        ? <Navigate to ={'/'}/> 
        : <SignupPage/>} 
        />
        <Route path= '/login' 
        element = {authUser
        ? <Navigate to ={'/'}/> 
        : <LoginPage/>} 
        />
      </Routes>

      <Toaster/>
      
    </div>
  )
}   

export default App