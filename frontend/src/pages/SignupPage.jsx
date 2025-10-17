import { useState } from "react"
import BorderAnimatedContainer from "../components/Border.jsx"
import { Eye, EyeClosed, Loader, LockIcon,  MailIcon, MessageCircle, UserIcon } from "lucide-react"
import {Link} from 'react-router'

import {useAuthStore} from '../store/useAuthStore.js'

function SignupPage(){

    const [isPasswordVisible,setPasswordVisible] = useState(false)

    const {isSigningUp, signUp} = useAuthStore()

    const [formData, setFormData] = useState({fullName:'', email:'', password:''})

    const submitForm = (e)=>{
        e.preventDefault()
        signUp(formData)
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
                            <div className="text-2xl text-slate-200 font-bold cursor-default">Create account</div>
                            <div className="text-slate-400 cursor-default">Sign up for a new account</div>     
                        </div>

                        <div className=" w-full px-10">
                            <form onSubmit={submitForm} className="gap-6 flex flex-col w-full">

                                {/* full name */}
                                
                                <div>
                                <label className="text-slate-400 font-semibold">Full Name</label>
                                <div className="form-signup">
                                    <UserIcon className="size-4 text-slate-400"/>
                                <input className="outline-hidden w-full"
                                type="text"  
                                placeholder="gg"
                                value={formData.fullName}
                                onChange={(e)=>setFormData({...formData, fullName:e.target.value})}
                                />
                                </div>
                                </div>
                                
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
                                   ? <Eye className="text-slate-400 z-10 cursor-pointer" /> 
                                   : <EyeClosed className="text-slate-400/75 z-10 cursor-pointer"/>
                                        
                                    }
                                </div>
                                </div>
                                </div>

                                {/* submit button */}
                                
                                <div>
                                    <button 
                                    className="auth-btn"
                                    type="submit"
                                    disabled={isSigningUp}
                                    >
                                        {isSigningUp
                                        ? <Loader className="animate-spin"/>
                                        : "Create Account"
                                    }
                                    </button>
                                </div>
                            </form>

                        </div>

                                <Link to="/login">
                            <div className="auth-redirect">
                                Already have an account? Login
                            </div>
                                </Link>
                    </div>

                    {/* form right side */}
                    
                    <div className="pt-0  hidden md:flex flex-col w-1/2 p-6 items-center justify-center">
                        <div className="relative overflow-hidden">
                            <img src="signup.png" alt="" 
                            className="-top-10 relative overflow-hidden size-full object-cover" 
                            />
                        </div>
                        <div className="-top-6 relative">
                            <div className="text-2xl pb-4 text-cyan-400/70 cursor-default font-semibold">
                                    Chat freely, Privacy in your hands
                            </div>
                            <div className="flex gap-12 justify-center ">
                                <div className="auth-badge">Free</div>
                                <div className="auth-badge">Encrypted</div>
                                <div className="auth-badge">Open Source</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </BorderAnimatedContainer>

            </div>
        </div>
    )
} 

export default SignupPage