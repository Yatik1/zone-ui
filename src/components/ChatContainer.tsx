import { useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage'
import Header from './Header'
import Input from './Input'
import MessageList from './MessageList'
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function ChatContainer() {

  const {chats} = useMessage() as any;
  const messagesEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate()
    const {isSignedIn} = useUser()

  if(chats.length > 3 && !isSignedIn) {
    (()=> {
      navigate("/auth/sign-in")
    })()
  }

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToBottom()
  } , [chats])

  return (
    <div className='flex flex-col h-screen bg-white'>
        <Header />
        <div className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto px-4 md:px-6">
            <div className='flex-1 overflow-y-auto py-6 noscroll'>
              <MessageList />
              <div ref={messagesEndRef} />
            </div>
            <div className="pb-6">
                <Input />
            </div>
        </div>
    </div>
  )
}

export default ChatContainer
