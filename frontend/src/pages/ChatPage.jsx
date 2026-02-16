import BorderAnimatedContainer from "../components/Border"
import { useChatStore } from "../store/useChatStore"
import ProfileHeader from "../components/ProfileHeader"
import ActiveTabSwitch from "../components/ActiveTabSwitch"
import ChatList from "../components/ChatList"
import ContactList from "../components/ContactList"
import ChatContainer from "../components/ChatContainer"
import NoConversationPlaceholder from "../components/NoConversationPlaceholder"

function ChatPage(){

    const {activeTab, selectedUser } = useChatStore()
    
    return(
        <div className="  w-full h-[750px] max-w-6xl z-10">
            <BorderAnimatedContainer>
                {/* left side */}

                <div className="w-[400px] bg-slate-800/50 flex flex-col border-r border-slate-700/50 ">
                    <ProfileHeader/>
                    <ActiveTabSwitch/>

                    <div className="flex flex-col overflow-y-auto py-4 gap-2">
                        {activeTab==='chats'
                            ?   <ChatList/>
                            :   <ContactList/>
                        }
                    </div>


                </div>

                {/* Right side */}

                <div className="w-full h-full ">
                        {selectedUser 
                            ? <ChatContainer/> 
                            : <NoConversationPlaceholder/>
                        }
                    
                </div>



            </BorderAnimatedContainer>
        </div>
    )
}

export default ChatPage