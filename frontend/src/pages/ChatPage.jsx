import BorderAnimatedContainer from "../components/Border"
import { useChatStore } from "../store/useChatStore"
import ProfileHeader from "../components/ProfileHeader"
import ActiveTabSwitch from "../components/ActiveTabSwitch"
import ChatList from "../components/ChatList"
import ContactList from "../components/ContactList"
import { Send } from "lucide-react"
import ChatContainer from "../components/ChatContainer"
import NoChatPlaceholder from "../components/NoChatPlaceholder"

function ChatPage(){

    const {activeTab,selectedUser } = useChatStore()
    
    return(
        <div className="  w-full h-[750px] max-w-6xl z-10">
            <BorderAnimatedContainer>
                {/* left side */}

                <div className="w-80 bg-slate-800/50 flex flex-col ">
                    <ProfileHeader/>
                    <ActiveTabSwitch/>

                    <div className="flex-1 overflow-y-auto p-4 gap-2">
                        {activeTab==='chats'
                            ?   <ChatList/>
                            :   <ContactList/>
                        }
                    </div>


                </div>

                {/* Right side */}

                <div className="relative w-full flex flex-col items-center justify-center">
                    <div>
                        {selectedUser? <ChatContainer/> : <NoChatPlaceholder/>}
                    </div>
                    
                </div>



            </BorderAnimatedContainer>
        </div>
    )
}

export default ChatPage