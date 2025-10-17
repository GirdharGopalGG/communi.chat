import { Loader, SendHorizonalIcon } from "lucide-react"
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder"
import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"
import ChatHeader from "./ChatHeader"

function ChatContainer(){

    const {messages, getMessageByUserId, selectedUser, isMessageLoading} = useChatStore()
    

    useEffect(()=>{
        getMessageByUserId(selectedUser._id)
    },[getMessageByUserId,selectedUser])
    
   
    
   return (
    <div className="flex flex-col h-full">
    <ChatHeader/>

    {
        isMessageLoading
            ?  <div className="flex h-full items-center justify-center "> <Loader className="  animate-spin size-20"/></div>
            :   messages.length>0  ?   (
                
                
    <div className="flex flex-col flex-1 min-h-0"> 
        <div className="flex-1 h-full overflow-y-auto space-y-4 p-4">
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
        </div>

        <div className="flex-shrink-0 p-4 w-full flex gap-4 items-center border-t border-slate-700/50">
            <input 
                type="text" 
                className="w-full outline-1 outline-cyan-800/70 rounded-xl h-10 px-3"
            />
            <div>
                <SendHorizonalIcon className="size-7"/>
            </div>
        </div>
    </div>

    )
    :
    (<NoChatHistoryPlaceholder name={selectedUser.fullName}/>)

    }

    
    
    </div>
)}

export default ChatContainer