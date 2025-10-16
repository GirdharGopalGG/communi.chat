import { SendHorizonalIcon } from "lucide-react"
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder"

function ChatContainer(){

    if(true){
        return <NoChatHistoryPlaceholder/>
    }
    
    return (
        <div>
            <div className="absolute p-4 pr-16 w-full flex gap-4 items-center justify-center bottom-0">
                <input type="text" className="w-full outline-1 outline-cyan-800/70 rounded-xl h-10"/>
                <div>
                    <SendHorizonalIcon/>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer