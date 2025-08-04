import { useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage'
import Header from './Header'
import Input from './Input'
import MessageList from './MessageList'
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MessageContextProps } from '../context/MessageContext';
import { UserDataProps } from '../types/type';
import useControl from '../hooks/useControl';
import { FlagProps } from '../context/ControlContext';

function ChatContainer() {

    const BACKEND_DB = import.meta.env.VITE_BACKEND_DB

    const {messages,setChats,newChat,setMessages} = useMessage() as MessageContextProps
    const {setIsLoading} = useControl() as FlagProps;

    const {id:chatId} = useParams() as {id:string}

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate()
    const {isSignedIn,user} = useUser()

    const hasCreatedUser = useRef(false)

    const createUser = async () => {
        try {
          await axios.post(`${BACKEND_DB}/api/users/`, {
            user_id: user?.id,
            user_name: user?.fullName
          });
          hasCreatedUser.current = true; 
        } catch (error) {
          console.error("Internal Error [USER CREATE ERROR]", error);
        }
    };

    const getUserChats = async () => {
             try {
                setIsLoading(true)
               const response = await fetch(`${BACKEND_DB}/api/get_users`)
               const data = await response.json()
               if(data) {
                 const filteredData = data.filter((userData:UserDataProps) => userData.user_id === user?.id)
                 filteredData.forEach((data:UserDataProps) => {
                   setChats([...data.chats].reverse())
                 })
               }
               setIsLoading(false)
             } catch (error) {
               console.error("Error occurred while fetching user information", error)
             }
         }

    useEffect(() => {
    if (isSignedIn && user?.id && user?.fullName && !hasCreatedUser.current && !newChat) {
      createUser()
    }
    if(isSignedIn && user) {
      getUserChats()
    }
  }, [ user, newChat]);

   async function chatMessages() {
    try {

      const response = await fetch(`${BACKEND_DB}/api/messages/${chatId}?user_id=${user?.id}`)
      const jsonResponse = await response.json()
      setMessages([...jsonResponse])
      
    } catch (error) {
      console.error("Error in fetching chat based messages", error)
    } 
  }

  useEffect(() => {
      if(chatId && user?.id) {
        chatMessages()
      }
  } , [chatId, user?.id])

  if(!isSignedIn) {
      navigate("/auth/sign-in")
  }

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    scrollToBottom() 
  } , [messages])

  return (
    <div className='flex flex-col w-full h-screen bg-white main-container'>
        <Header />
        <figcaption className='w-full bg-amber-500 p-1 flex items-center justify-center text-sm'>⚠️ Zone is still in development.</figcaption>
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
