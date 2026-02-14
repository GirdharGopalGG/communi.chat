import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import ChatHeader from "./ChatHeader"
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton"
import MessageInput from "./MessageInput"

function ChatContainer(){

    const {messages, getMessageByUserId, selectedUser, isMessageLoading} = useChatStore()
    const {authUser} = useAuthStore()

    useEffect(()=>{
        if (selectedUser && selectedUser._id) {
            getMessageByUserId(selectedUser._id)
        }
    },[getMessageByUserId,selectedUser])
    
   // Helper function to format date labels
const formatDateLabel = (date) => {
  const messageDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Reset time for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  messageDate.setHours(0, 0, 0, 0);
  
  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
  }
};

// Helper to check if two dates are on different days
const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

    
   return (
    <div className="flex flex-col h-full">
    <ChatHeader/>

    {
        isMessageLoading
            ?  <MessagesLoadingSkeleton/>
            :   messages.length>0  ?   (
                
                
    <div className="flex flex-col flex-1 min-h-0"> 
        <div className="flex-1 h-full overflow-y-auto space-y-4 p-4">
            {messages.map((m,index)=>{

                  const showDateSeparator = index === 0 || !isSameDay(m.createdAt, messages[index - 1].createdAt);

                  return(
                    <div key={m._id}>
                    {console.log(`authUser Id: :,${authUser._id} ,\n m.sender id: ${m.senderId}`)}
                    {showDateSeparator && (
                        <div className="flex justify-center my-4">
                            <div className="bg-slate-900/50 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium cursor-default">
                                {formatDateLabel(m.createdAt)}
                            </div>
                        </div>
                    )}
                    <div key={m._id} 
                    className={`chat cursor-default ${authUser._id === m.senderId
                        ?   `chat-end`
                        :   `chat-start`   
                    }`}>
                        
                        <div className={`chat-bubble ${authUser._id === m.senderId
                            ? 'bg-cyan-900/40 text-slate-200'
                            : 'bg-slate-500/20 text-slate-200'
                        }`}>
                            {m.image && 
                            <img src={m.image} className="rounded-md object-cover"/>
                            }
                            {m.text && <p className="">{m.text}</p>}
                            <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                        {new Date(m.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}
                    </p>
                        </div>
                    </div>
                </div>)
            })}
        </div>

    </div>

    )
    :
    (<NoChatHistoryPlaceholder name={selectedUser?.fullName}/>)

    }

    
    
    <MessageInput/>
    </div>
)}

export default ChatContainer