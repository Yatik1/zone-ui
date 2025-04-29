
import { ArrowUp, Globe, PersonStanding, Plus } from 'lucide-react'
import useMessage from '../hooks/useMessage'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import FileSegment from './ui/FileSegment';


// interface FileInputProps {
//   file:File | null, 
//   fileQuery:string,
// }

function Input() {

  const {setChats, chats, setMessage:newMessage} = useMessage() as any;

  const [message, setMessage] = useState<any>("")
  const [selectedResponse, setSeletedResponse] = useState<string>("short")
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [file, setFile] = useState<File | undefined>(undefined)

  const fileInput = useRef<HTMLInputElement>(null)

  const handleDivClick = () => {
    fileInput.current?.click()
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if(selectedFile && (selectedFile?.name.includes(".txt") || selectedFile?.name.includes(".docx"))){
      setFile(selectedFile)
    } else {
      setFile(undefined)
    }
  }

  // async function uploadFile(e?:React.FormEvent) {
  //   e?.preventDefault()
  //   if(!file || message.length === 0) return;
  //   try{
  //     setLoading(true)
  //     newMessage(message)
  //     const formData = new FormData()
  //     formData.append("file", file)
  //     formData.append("message", message)

  //     // const res = await axios.post()
  //     console.log({file, message})
  //   } catch(error) {
  //     console.log("[File upload error]", error)
  //   }
    
  // }

  async function shortResponse() {
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

  async function detailedResponse() {
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

  async function fileSubmit() {
      try {
        setLoading(true)
        newMessage(file?.name,message)
        const formData = new FormData()
        formData.append('file',file as any);
        formData.append('message', message);

        const res = await axios.post('http://localhost:8000/upload_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setChats([...chats, res.data])
      } catch (error) {
        console.log("File upload error", error)
      } finally{
        removeFile()
        setMessage("")
        setLoading(false)
      }
  }

  function removeFile() {
    setFile(undefined); 
    if(fileInput.current) fileInput.current.value = "";
  }

  function handleResponses(e?:React.FormEvent) {
    e?.preventDefault()

    if(message.length === 0) return;

    if(fileInput.current?.value) {
      fileSubmit()
      return;
    }

    selectedResponse === "short" ? shortResponse() : detailedResponse()

  }

  useEffect(() => {
    if(message.length>0) setDisabled(false);
    else setDisabled(true);
  },[message])

  return (
 
    <div className=' flex border h-fit bg-white border-gray-300 rounded-xl px-4 py-4 mb-1 flex-1 items-center justify-center gap-2'>
        <div className='w-full h-full flex flex-col items-start justify-center gap-2'>
          {file && (
            <FileSegment fileName={file?.name} remove={removeFile} />
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
        className={`flex-shrink-0 w-8 h-8 rounded-full  text-white flex items-center justify-center ${disabled && "hidden"} ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-b from-black to-gray-500  cursor-pointer "}`}
        onClick={handleResponses}
        disabled={loading}
      >
        <ArrowUp className='w-5 h-5'/>
      </button> 

    </div>  
  )
}

export default Input