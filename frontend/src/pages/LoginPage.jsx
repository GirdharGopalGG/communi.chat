import { useState } from "react"
import BorderAnimatedContainer from "../components/Border.jsx"
import { Eye, EyeClosed, Loader, LockIcon,  MailIcon, MessageCircle, UserIcon } from "lucide-react"
import {Link} from 'react-router'

import {useAuthStore} from '../store/useAuthStore.js'

function LoginPage(){

    const [isPasswordVisible,setPasswordVisible] = useState(false)

    const {isLoggingUp, login} = useAuthStore()

    const [formData, setFormData] = useState({ email:'', password:''})

    const submitForm = (e)=>{
        e.preventDefault()
        login(formData)
    }
    
    
    return (
        <div className="flex justify-center items-center bg-slate-900 w-full">
            <div className="relative w-full max-w-6xl">
                <BorderAnimatedContainer>
                <div className="flex flex-col md:flex-row w-full p-8">

                    {/* FORM COLUMN - LEFT SIDE */}

                    <div className="md:w-1/2 p-8 flex flex-col items-center justify-center md:border-r border-slate-600/50">
                        <div className="text-center mb-8">
                            <MessageCircle className="text-slate-400 mx-auto size-12 mb-4"/>
                            <div className="text-2xl text-slate-200 font-bold cursor-default">Welcome back!!!</div>
                            <div className="text-slate-400 cursor-default">Login to access your account</div>     
                        </div>

                        <div className=" w-full px-10">
                            <form onSubmit={submitForm} className="gap-6 flex flex-col w-full">

                                {/* email */}
                                
                                <div>
                                <label className="text-slate-400 font-semibold">Email</label>
                                <div className="form-signup">
                                    <MailIcon className="size-4 text-slate-400"/>
                                <input className="outline-hidden w-full"
                                type="text"  
                                placeholder="gg@gmail.com"
                                value={formData.email}
                                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                />
                                </div>
                                </div>

                                {/* password */}

                                <div>
                                <label className="text-slate-400 font-semibold">Password</label>
                                <div className="form-signup">
                                    <LockIcon className="size-4 text-slate-400"/>
                                <input className="outline-hidden w-full" 
                                type={isPasswordVisible
                                        ? "text" 
                                        : "password"
                                    }  
                                placeholder="123456😂"
                                value={formData.password}
                                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                />
                                <div onClick={()=>setPasswordVisible(!isPasswordVisible)}>
                                    {isPasswordVisible 
                                   ?<Eye className="text-slate-400 z-10 cursor-pointer" /> 
                                   :<EyeClosed className="text-slate-400/75 z-10 cursor-pointer"/>
                                        
                                    }
                                </div>
                                </div>
                                </div>

                                {/* submit button */}
                                
                                <div>
                                    <button 
                                    className="auth-btn"
                                    type="submit"
                                    disabled={isLoggingUp}
                                    >
                                        {isLoggingUp
                                        ? <Loader className="animate-spin"/>
                                        : "Login"
                                    }
                                    </button>
                                </div>
                            </form>

                        </div>

                                <Link to="/signup">
                            <div className="auth-redirect">
                                Don't have an account? Register
                            </div>
                                </Link>
                    </div>

                    {/* form right side */}
                    
                    <div className="pt-0  hidden md:flex flex-col w-1/2 p-6 items-center justify-center">
                        <div className="relative overflow-hidden">
                            <img src="login.png" alt="" 
                            className="-top-10 relative overflow-hidden" 
                            />
                        </div>
                        <div className="-top-6 relative">
                            <div className="text-2xl pb-4 text-cyan-400/70 cursor-default font-semibold">
                                    Chat securely to your close ones
                            </div>
                            <div className="flex gap-12 justify-center ">
                                <div className="auth-badge">Secure</div>
                                <div className="auth-badge">Fast</div>
                                <div className="auth-badge">Reliable</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </BorderAnimatedContainer>

            </div>
        </div>
    )
} 

export default LoginPage