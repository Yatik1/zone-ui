
import { ArrowUp } from 'lucide-react'
import useMessage from '../hooks/useMessage'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Input() {

  const {setChats, chats, setMessage:newMessage} = useMessage() as any;

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  async function handleClick(e?:React.FormEvent) {
    e?.preventDefault()
    if(message.length === 0) return;
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
    if(message.length>0) setDisabled(false);
    else setDisabled(true);
  },[message])

  return (
    <form
      onSubmit={handleClick}
      className="relative transition-all duration-200 ease-in-out"
    >


    <div className=' flex border h-fit bg-white border-gray-300 rounded-xl px-4 py-4 mb-1 flex-1 items-center justify-center gap-2'>
        <input
            type='text'
            className=' w-full outline-none resize-none'
            value={message || ""}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMessage(e.target.value)}}
            placeholder='Write your query...'
        />

        <button 
          className={`flex-shrink-0 w-8 h-8 rounded-md bg-black bg-opacity-40 text-white flex items-center justify-center backdrop-blur-md ${disabled && "hidden"} ${loading && "bg-gray-400"}`}
          onClick={handleClick}
          disabled={loading}
        >
          <ArrowUp className='w-5 h-5 cursor-pointer rotate-90'/>
        </button> 
    </div>  
    </form>
  )
}

export default Input