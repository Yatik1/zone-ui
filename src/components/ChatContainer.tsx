import { useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage'
import Header from './Header'
import Input from './Input'
import MessageList from './MessageList'
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ChatContainer() {

    const {messages,setChats,newChat,setMessages} = useMessage() as any;

    const {id:chatId} = useParams() as {id:string}

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

    const getUserChats = async () => {
             try {
               const response = await fetch(`http://localhost:8001/api/get_users`)
               const data = await response.json()
               if(data) {
                 const filteredData = data.filter((userData:any) => userData.user_id === user?.id)
                 filteredData.forEach((data:any) => {
                   setChats([...data.chats].reverse())
                 })
               }
             } catch (error) {
               console.log("Error occurred while fetching user information", error)
             }
         }

    useEffect(() => {
    if (isSignedIn && user?.id && user?.fullName && !hasCreatedUser.current && !newChat) {
      createUser()
    }
    getUserChats()
  }, [isSignedIn, user, newChat]);

   async function chatMessages() {
    try {

      const response = await fetch(`http://localhost:8001/api/messages/${chatId}?user_id=${user?.id}`)
      const jsonResponse = await response.json()
      setMessages([...jsonResponse])
      
    } catch (error) {
      console.log("Error in fetching chat based messages", error)
    } 
  }

  useEffect(() => {
      if(chatId && user?.id) {
        chatMessages()
      }
  } , [chatId, user?.id])

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
    <div className='flex flex-col w-full h-screen bg-white main-container'>
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
