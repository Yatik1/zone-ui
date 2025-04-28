
import useMessage from '../hooks/useMessage'
import MessageItem from './MessageItem'

function MessageList() {
    const {message, chats} = useMessage() as any


    // console.log(chats)
    if(!message && !chats.length) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <h3 className='font-semibold text-2xl'>Start conversation with your AI companion</h3>
                <p className='italic text-zinc-500 text-sm'>Try asking question or share something you'd like to discuss</p>
            </div>
        )
    }
  return (
    <div className='space-y-4'>
        {chats.length >0 && 
            chats.map((chat:any, index:any) => (
                <div key={index}>
                    <MessageItem chat={chat} />
                </div>
            ))
        }
    </div>
  )
}

export default MessageList