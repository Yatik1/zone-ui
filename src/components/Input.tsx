
import { ArrowUp } from 'lucide-react'
import useMessage from '../hooks/useMessage'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Input() {

  // message, setMessage,
  const {setChats, chats, setMessage:newMessage} = useMessage() as any;

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  async function handleClick() {
    try {
      setLoading(true)
      newMessage(message)
      const res = await axios.post('http://localhost:8000/chats', { message });
      setChats([...chats, res.data])
    } catch (error) {
        console.log("[Chat Post Error]", error)
    } finally{
      setMessage("")
      setLoading(false)
    }
  }

  useEffect(() => {
    if(message) setDisabled(false);
    else setDisabled(true);
  },[message])

  return (
    <div className=' flex border bg-white border-gray-300 rounded-xl px-4 py-4 mb-1 flex-1 items-center justify-center'>
        <input 
            className=' w-full outline-none'
            value={message || ""}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMessage(e.target.value)}}
            placeholder='Write your query...'
        />
        <button 
          className={`w-[1.5rem] h-[1.5rem] p-[0.25rem] bg-blue-900 text-white rounded-xl flex items-center justify-center ${disabled && "hidden"} ${loading && "bg-gray-400"}`}
          onClick={handleClick}
          disabled={loading}
        >
          <ArrowUp className='w-full h-full cursor-pointer'/>
        </button>
    </div>  
  )
}

export default Input