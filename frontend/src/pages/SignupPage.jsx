import { useState } from "react"
import BorderAnimatedContainer from "../components/Border.jsx"
import { Loader, Loader2Icon, LockIcon, LucideLoader, MailIcon, MessageCircle, UserIcon } from "lucide-react"
import {Link} from 'react-router'

import {useAuthStore} from '../store/useAuthStore.js'

function SignupPage(){

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
                            <h2 className="text-2xl text-slate-200 font-bold">Create account</h2>
                            <p className="text-slate-400">Sign up for a new account</p>     
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
                                type="text"  
                                placeholder="123456😂"
                                value={formData.password}
                                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                />
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

                            <div className="auth-redirect">
                                <Link to="/login">
                                Already have an account? Login
                                </Link>
                            </div>
                    </div>

                    {/* form right side */}
                    

                    
                </div>
                </BorderAnimatedContainer>

            </div>
        </div>
    )
} 

export default SignupPage