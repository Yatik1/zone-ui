
import { FlagProps } from '../context/ControlContext'
import { MessageContextProps } from '../context/MessageContext'
import useControl from '../hooks/useControl'
import useMessage from '../hooks/useMessage'
import MessageItem from './MessageItem'

function MessageList() {
    const {message, messages} = useMessage() as MessageContextProps
    const {isLoading} = useControl() as FlagProps

    const isHome = window.location.pathname === "/"

    if(!message && !messages.length && isHome) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <h3 className='font-semibold text-2xl bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent'>Start conversation with your AI companion</h3>
                <p className='italic text-zinc-500 text-sm'>Try asking question or share something you'd like to discuss</p>
            </div>
        )
    }
    
  return (
    <div className='space-y-4'>
        {
            isLoading ? (
                <div className='flex flex-col w-full h-full gap-2'>
                    {
                        [...Array(2)].map((_,index) => (
                            <div key={index}>
                                <div className="flex flex-col gap-2 items-end justify-end">
                                    <div className="bg-gray-200 animate-pulse w-1/4 h-10 rounded-lg" />
                                </div>

                                <div className="flex flex-col gap-2 items-start justify-start">
                                    <div className="bg-gray-100 animate-pulse w-1/2 h-40 rounded-lg" />
                                 </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
               <>
                    { messages.length >0 && messages.map((chat, index) => (
                            <div key={chat.message_id || index}>
                                <MessageItem chat={chat} />
                            </div>
                        ))
                    }
               </>
            )
        }
    </div>
  )
}

export default MessageList