import { MessageSquareXIcon } from "lucide-react"
import { useChatStore } from "../store/useChatStore"

function ChatHeader(){

    const {selectedUser, setSelectedUser } = useChatStore()
    
    return(
    <>
    <div className="max-h-20 flex justify-between items-center p-6 py-[46.5px] bg-slate-800 border-b border-slate-700/50 ">

        <div className="flex">
            <img src={selectedUser.profilePic || 'avatar.png'} className="w-12 object-cover cursor-default" alt={selectedUser.fullName}  />
            <div className="pl-4 flex-col cursor-default">
                    {selectedUser.fullName}
                <div className="text-slate-300/80 text-sm cursor-default">
                    Online
                </div>
            </div>
        </div>
        
        <div>
            <MessageSquareXIcon className="size-7 text-slate-400 hover:text-slate-300 cursor-pointer " onClick={()=>setSelectedUser(null)}/>
        </div>
    </div>
    </>

    )
}

export default ChatHeader