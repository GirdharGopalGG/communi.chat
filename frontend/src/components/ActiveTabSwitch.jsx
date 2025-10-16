import  {  LucideContact, MessageCircle } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'

function ActiveTabSwitch(){

    const {activeTab, setActiveTab} = useChatStore()
    
    return (
        <div className="py-4 ">
            <div className="flex items-center justify-center px-auto tabs tabs-lift bg-transparent ">
                <div className={` tab ${
                    activeTab === 'chats'
                        ?   'bg-cyan-500/20 '
                        :   'bg-transparent hover:bg-slate-900/80 transition duration-200'
                }`} onClick={()=>setActiveTab('chats')
                    
                }>
                <MessageCircle className=' text-cyan-400'/>
                <div className='px-1  text-cyan-300'>Chats</div>
                <div className='tab-content'>
                    
                </div>
                </div>
                <div className={` tab ${
                    activeTab === 'contacts'
                        ?   'bg-cyan-500/20'
                        :   'bg-transparent hover:bg-slate-900/80 transition duration-200'
                }`} onClick={()=>setActiveTab('contacts')}>
                <LucideContact className='text-cyan-400'/>
                <div className='px-1 text-cyan-300'>Contacts</div>
                <div className='tab-content'>
                    

                </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveTabSwitch