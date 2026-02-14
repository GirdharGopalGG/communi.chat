import { ImagePlusIcon, Loader, SendHorizonalIcon } from "lucide-react"

function MessageInput(){
    return(
        <div className="flex-shrink-0 p-4 w-full flex gap-4 items-center border-t border-slate-700/50">
            <input 
                type="text" 
                className="w-full outline-1 outline-cyan-800/70 rounded-xl h-10 px-3"
            />
            <div className="flex gap-4 justify-center items-center">
                <div >
                    <ImagePlusIcon className="size-6 cursor-pointer"/>
                </div>
                <div>
                    <SendHorizonalIcon className="size-6 cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default MessageInput