
import { ArrowUp, File, Globe, PersonStanding, Plus, X } from 'lucide-react'
import useMessage from '../hooks/useMessage'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function Input() {

  const {setChats, chats, setMessage:newMessage} = useMessage() as any;

  const [message, setMessage] = useState("")
  const [selectedResponse, setSeletedResponse] = useState<string>("short")
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [file, setFile] = useState<File | null>(null)

  const fileInput = useRef<HTMLInputElement>(null)

  const handleDivClick = () => {
    fileInput.current?.click()
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if(selectedFile && (selectedFile?.name.includes(".txt") || selectedFile?.name.includes(".docx"))){
      setFile(selectedFile)
    } else {
      setFile(null)
    }
  }

  async function shortResponse(e?:React.FormEvent) {
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

  async function detailedResponse(e?:React.FormEvent) {
    e?.preventDefault()
    if(message.length === 0) return;
    try {
      setLoading(true)
      newMessage(message)
      const res = await axios.post('http://localhost:8000/ask', { query : message });
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
      onSubmit={(selectedResponse === "short" ? shortResponse : detailedResponse)}
      className="relative transition-all duration-200 ease-in-out"
    >


    <div className=' flex border h-fit bg-white border-gray-300 rounded-xl px-4 py-4 mb-1 flex-1 items-center justify-center gap-2'>
        <div className='w-full h-full flex flex-col items-start justify-center gap-2'>
          {file && (
            <div className='w-full flex items-start justify-start p-1'>
              <div className='relative w-fit h-fit flex items-center justify-start bg-[#4A87ED] px-3 py-4 rounded-md text-md text-white font-semibold gap-2'>
                <File />
                {file.name}
                <button className='absolute right-1 top-1 bg-white rounded-full group flex items-center justify-center text-black cursor-pointer' onClick={() => {setFile(null)}}>
                  <X className='w-[14px] h-[14px]' />
                </button>
              </div>
            </div>
          )}
          {selectedResponse !== "detailed" ? (
            <input
            type='text'
            className=' w-full outline-none resize-none mb-1'
            value={message || ""}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMessage(e.target.value)}}
            placeholder='Write your message...'
          />
          ) : (
            <textarea
            className='w-full outline-none resize-none'
            value={message || ""}
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {setMessage(e.target.value)}}
            placeholder='Write your query...'
            rows={2}
          />
          )}

          <div className={`flex items-start justify-center gap-2`}>
            <div className='flex items-center justify-center p-1 rounded-full border border-gray-300 cursor-pointer' onClick={handleDivClick}>
             <input 
                type='file'
                ref={fileInput}
                className='hidden'
                onChange={handleFileChange}
              />
              <Plus className='w-5 h-5' />
            </div>
          <div className={`flex items-center justify-center gap-1 ${selectedResponse === "short" ? "bg-orange-300 text-orange-900 border border-orange-600" : "bg-gray-200 text-gray-800"} text-sm px-3 py-1 rounded-full cursor-pointer`} onClick={() => {setSeletedResponse("short")}}>
              <PersonStanding className="w-4 h-4" />
              Short friendly Response
          </div>

          <div className={`flex items-center justify-center gap-1 ${selectedResponse === "detailed" ? "bg-emerald-300 text-emerald-900 border border-emerald-600" : "bg-gray-200 text-gray-800"} text-sm px-3 py-1 rounded-full cursor-pointer`} onClick={() => {setSeletedResponse("detailed")}}>
              <Globe className="w-4 h-4" />
              Detailed Response
          </div>
          </div>

        </div>

        <button 
          className={`flex-shrink-0 w-8 h-8 rounded-md  text-white flex items-center justify-center ${disabled && "hidden"} ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-br to-zinc-600 from-black cursor-pointer "}`}
          onClick={() => {selectedResponse === "short" ? shortResponse() : detailedResponse()}}
          disabled={loading}
        >
          <ArrowUp className='w-5 h-5 rotate-90'/>
        </button> 
    </div>  
    </form>
  )
}

export default Input