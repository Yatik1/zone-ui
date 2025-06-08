import { ArrowUp, File, FileText, Globe, Mic, Plus, Square, User } from 'lucide-react'
import useMessage from '../hooks/useMessage'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import FileSegment from './ui/FileSegment';
import { easeIn, motion } from "motion/react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useParams } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

function Input() {

  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isFile, setIsFile] = useState<boolean>(false)

  const { setMessages, messages, setMessage: newMessage } = useMessage() as any;

  const [message, setMessage] = useState<string>("")
  const [selectedResponse, setSelectedResponse] = useState<string | undefined>("short")
  const [file, setFile] = useState<File | undefined>(undefined)

  const fileInput = useRef<HTMLInputElement>(null)
  const {id:chatId} = useParams() as any
  const {user} = useClerk() 

  const {
    browserSupportsSpeechRecognition,
    transcript,
    listening,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>
  }
  useEffect(() => {
    if (!listening && transcript) {
      setMessage(transcript)
    }
  }, [listening, transcript])

  const toggleListening = () => {
    if (!listening) {
      SpeechRecognition.startListening()
    } else {
      SpeechRecognition.stopListening()
    }
  }

  const handleDivClick = () => {
    fileInput.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      setIsFile(true)
    } else {
      setFile(undefined)
      setIsFile(false)
    }
  }

  async function shortResponse() {
    try {
      setLoading(true)
      newMessage(message)

      const payload = {
        message, 
        chat_id:chatId,
        user_id:user?.id
      }

      const res = await axios.post('http://localhost:8000/chats', payload);
      setMessages([...messages, res.data])
    } catch (error) {
      console.log("[Chat Post Error]", error)
    } finally {
      setMessage("")
      setLoading(false)
    }
  }

  async function detailedResponse() {
    try {
      setLoading(true)
      newMessage(message)
      const res = await axios.post('http://localhost:8000/ask', { query: message });
      setMessages([...messages, res.data])
    } catch (error) {
      console.log("[Chat Post Error]", error)
    } finally {
      setMessage("")
      setLoading(false)
    }
  }

  async function fileSubmit() {
    try {
      setLoading(true)
      setIsFile(true)
      setSelectedResponse(undefined)
      newMessage(file?.name, message)
      const formData = new FormData()
      formData.append('file', file as any);
      formData.append('message', message);

      const res = await axios.post('http://localhost:8000/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMessages([...messages, res.data])
    } catch (error) {
      console.log("File upload error", error)
    } finally {
      removeFile()
      setIsFile(false)
      setMessage("")
      setLoading(false)
      setSelectedResponse("short")
    }
  }

  function removeFile() {
    setFile(undefined); 
    setIsFile(false)
    if (fileInput.current) fileInput.current.value = "";
  }

  function handleResponses(e?: React.FormEvent) {
    e?.preventDefault()

    if (message.length === 0) return;

    if (fileInput.current?.value) {
      fileSubmit()
      return;
    }

    selectedResponse === "short" ? shortResponse() : detailedResponse()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && Number(message)!== 0 && message.length > 0) {
      e.preventDefault();
      handleResponses(e);
    }
  }

  useEffect(() => {
    if (Number(message)!== 0 && message.length > 0) setDisabled(false);
    else setDisabled(true);
  }, [message])

  return (
    <div className='relative flex border h-fit bg-white border-gray-300 rounded-xl px-4 py-4 mb-1 flex-1 items-center justify-center gap-2 shadow-md'>
      <div className='w-full h-full flex flex-col items-start justify-center gap-2'>

        {file && (
          <FileSegment fileName={file.name} remove={removeFile} />
        )}

        {isFile ? (
          <input
            type='text'
            name='file_input'
            className='w-full outline-none resize-none mb-1'
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            placeholder='Ask anything regarding document.'
            onKeyDown={handleKeyDown}
          />
        ) : selectedResponse !== "detailed" ? (
          <input
            type='text'
            name='friendly_responses'
            className='w-full outline-none resize-none mb-1'
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            placeholder='Lets Chat'
            onKeyDown={handleKeyDown}
          />
        ) : (
          <textarea
            className='w-full outline-none resize-none'
            name='research'
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            placeholder={`Ask Anything\n\u2022 For the given question, AI will give you detailed information`}
            rows={2}
            onKeyDown={handleKeyDown}
          />
        )}        

        <div className={`flex flex-1 w-full items-center justify-center gap-2`}>
          <div className='flex items-center justify-center p-1 rounded-full border border-gray-300 cursor-pointer' onClick={handleDivClick}>
            <input 
              type='file'
              ref={fileInput}
              className='hidden'
              onChange={handleFileChange}
            />
            <Plus className='w-5 h-5' />
          </div>

          <div className='flex items-center justify-start w-full gap-2'>

            {isFile ? (
              file?.name.endsWith(".pdf") ? (
                <button className='flex items-center justify-start gap-1 bg-pink-300 text-pink-900 border border-pink-600 text-sm px-3 py-1 rounded-full'>
                  <File className="w-4 h-4" />
                  <p className='w-fit'>PDF</p>
                </button>
              ) : (
                <button className='flex items-center justify-start gap-1 bg-blue-300 text-blue-900 border border-blue-600 text-sm px-3 py-1 rounded-full'>
                  <FileText className="w-4 h-4" />
                  <p className='w-fit'>Document</p>
                </button>
              )
            ) : (
              <>
                <button 
                  className={`flex items-center justify-start gap-1 ${selectedResponse === "short" ? "bg-orange-300 text-orange-900 border border-orange-600" : "bg-gray-200 text-gray-800"} text-sm px-3 py-1 rounded-full cursor-pointer`}
                  onClick={() => { setSelectedResponse("short") }}
                >
                  <User className="w-4 h-4" />
                  <p className='w-fit'>Friend</p>
                </button>

                <button 
                  className={`flex items-center justify-center gap-1 ${selectedResponse === "detailed" ? "bg-emerald-300 text-emerald-900 border border-emerald-600" : "bg-gray-200 text-gray-800"} text-sm px-3 py-1 rounded-full cursor-pointer`}
                  onClick={() => { setSelectedResponse("detailed") }}
                >
                  <Globe className="w-4 h-4" />
                  Detailed Information
                </button>
              </>
            )}

          </div>

          <div className="flex items-end justify-end gap-1">
            <button
              className='flex-shrink-0 rounded-full border border-gray-300 flex items-center text-gray-600 justify-center p-1'
              onClick={toggleListening}
            >
              {listening ? (
                <Square className='fill-zinc-950 w-5 h-5 p-1' />
              ) : (
                <Mic className='w-5 h-5' />
              )}
            </button>
            <button
              className={`flex-shrink-0 rounded-full text-white flex items-center justify-center p-1 ${disabled && "hidden"} ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 cursor-pointer"}`}
              onClick={handleResponses}
              disabled={loading}
            >
              <ArrowUp className='w-5 h-5'/>
            </button>
          </div>
        </div>
      </div>

      {loading && (!selectedResponse || selectedResponse === "detailed" || isFile) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeIn }}
          className="absolute top-[-3rem] left-0 w-fit bg-linear-to-br from-stone-400 via-stone-300 to-stone-200 py-1 px-[0.4rem] border border-stone-400 rounded-lg flex items-center justify-center gap-2"
        >
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-500 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-linear-to-br from-stone-700 via-stone-600 to-stone-400"></span>
          </span>
          <p className="text-sm">Analysing</p>
        </motion.div>
      )}
    </div>
  )
}

export default Input;
