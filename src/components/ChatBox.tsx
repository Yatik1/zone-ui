import React from 'react'

function ChatBox() {
  return (
    <div className='flex flex-col h-screen p-10 bg-gray-400 items-center justify-end'>
      <input
      type='text'
      className='border border-gray-300 rounded-lg px-3 py-4 w-1/4'
      />
    </div>
  )
}

export default ChatBox