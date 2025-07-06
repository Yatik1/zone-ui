
import useMessage from '../hooks/useMessage'
import MessageItem from './MessageItem'

function MessageList() {
    const {message, messages} = useMessage() as any

    if(!message && !messages.length) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <h3 className='font-semibold text-2xl bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent'>Start conversation with your AI companion</h3>
                <p className='italic text-zinc-500 text-sm'>Try asking question or share something you'd like to discuss</p>
            </div>
        )
    }
    
  return (
    <div className='space-y-4'>
        {messages.length >0 && 
            messages.map((chat:any) => (
                <div key={chat.message_id}>
                    <MessageItem chat={chat} />
                </div>
            ))
        }
    </div>
  )
}

export default MessageList