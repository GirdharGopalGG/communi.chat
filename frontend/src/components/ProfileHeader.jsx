import  { Loader2, LogOutIcon, Volume2Icon, VolumeOff } from 'lucide-react'
import {useChatStore} from '../store/useChatStore.js'
import {useAuthStore} from '../store/useAuthStore.js'
import { useRef, useState } from 'react'

function ProfileHeader(){

    const {authUser, logout, updateProfile} = useAuthStore()
    
    const {isSoundEnabled, toggleSound} = useChatStore()

    const [selectedImg,setSelectedImg] = useState(null)
    const fileInputRef = useRef(null)


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
  };
    
    
    return (
        <div className="flex items-center justify-center py-8 border-b border-slate-600  ">
            <div className="flex justify-between w-full px-5">
                <div className='flex justify-center '>

                    {/* <div className=" pr-2">
                        <img src="avatar.png" alt="avatar" className="size-12 avatar  " />
                    </div>  */}

    <div className="relative ">
        <button
            className=" avatar-online size-14 rounded-full overflow-hidden "
            onClick={() => fileInputRef.current.click()}
        >
            <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover "
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition ease-in duration-300 rounded-full size-14">
                <span className="text-white text-xs">Change</span>
            </div>
        </button>

        <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
        />
    </div>

                    <div className="flex flex-col pl-2 ">
                        <div className='truncate'>
                            {authUser.fullName?? <div className="h-4 w-20 bg-slate-600 rounded animate-pulse" />} 
                        </div>
                        <div className='text-slate-300/80 text-sm'>
                            {authUser
                                ? 'Online'
                                : 'Offline' (<span><Loader2 className='animate-spin size-5'/></span>)
                            }
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 items-center  icon-container '>
                    <div onClick={()=>logout()}>
                        <LogOutIcon />
                    </div>  
                    <div onClick={()=>toggleSound()}>
                        {isSoundEnabled 
                            ?<Volume2Icon />
                            :<VolumeOff />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileHeader