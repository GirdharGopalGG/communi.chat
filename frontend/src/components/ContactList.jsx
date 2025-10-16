import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import UsersLoadingSkeleton from "./UsersLoadingSkeleton"

function ContactList(){

    const {allContacts, isUserLoading, getAllContacts, setSelectedUser} = useChatStore()
    

    useEffect(()=>{
        getAllContacts()
    },[getAllContacts])
    
    if(isUserLoading){
        return <UsersLoadingSkeleton/>
    }
    
    return (
        <div className="flex  flex-col gap-2 ">
            {allContacts.map((chat)=>(
            <div 
                key={chat._id}
                className=" group flex gap-3 py-2 border-b-1  border-cyan-300/80 rounded-2xl bg-slate-800/30 hover:bg-slate-900 cursor-pointer w-full items-center transition duration-300  "
                onClick={() => setSelectedUser(chat)}
            >
                
                    <div className="size-12 rounded-full ml-2 group-hover:animate-spin-slow ">
                        <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
                    </div>
            
                <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
                
            ))}
        </div>
    )
}

export default ContactList