
import { SendIcon } from 'lucide-react'
import React from 'react'

function Input() {
  return (
    <div className=' flex border border-gray-300 rounded-xl py-4 mb-1 flex-1 items-center justify-center'>
        <input 
            className='px-4 w-full outline-none'
            placeholder='Write your query...'
        />
        <SendIcon className='w-5 h-5 cursor-pointer mr-3'/>
    </div>  
  )
}

export default Input