import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import UsersLoadingSkeleton from "./UsersLoadingSkeleton"
import NoChatsFound from "./NoChatsFound"
import { useAuthStore } from "../store/useAuthStore"

function ChatList(){

    const {getChatPartners, chats, setSelectedUser, isUserLoading} = useChatStore()
    
    const {onlineUsers} = useAuthStore()
    
    useEffect(()=>{
        getChatPartners()
    },[getChatPartners])
    

    if(isUserLoading){
        return <UsersLoadingSkeleton/>
    }
    if(chats.length === 0){
        return <NoChatsFound/>
    }    
    
     return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className=" group flex gap-3 py-2 border-b-1  border-cyan-300/80 rounded-2xl bg-slate-800/30 hover:bg-slate-900 cursor-pointer w-full items-center transition duration-300  "
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={` ${onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full ml-2">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatList