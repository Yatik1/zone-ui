import { useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage'
import Header from './Header'
import Input from './Input'
import MessageList from './MessageList'
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChatContainer() {

    const {messages} = useMessage() as any;
    // const {id} = useParams() as {id:string}

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate()
    const {isSignedIn,user} = useUser()

    const hasCreatedUser = useRef(false)

    const createUser = async () => {
        try {
          await axios.post('http://localhost:8001/api/users/', {
            user_id: user?.id,
            user_name: user?.fullName
          });
          hasCreatedUser.current = true; 
        } catch (error) {
          console.log("Internal Error [USER CREATE ERROR]", error);
        }
    };

    



    useEffect(() => {
    if (isSignedIn && user?.id && user?.fullName && !hasCreatedUser.current) {
      createUser();
    }
  }, [isSignedIn, user]);


  if(messages.length > 3 && !isSignedIn) {
      navigate("/auth/sign-in")
  }

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToBottom()
  } , [messages])

  return (
    <div className='flex flex-col w-full h-screen bg-white'>
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
