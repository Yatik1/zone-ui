import React from 'react'
import Header from './Header'
import Input from './Input'

function ChatContainer() {
  return (
    <div className='flex flex-col h-screen bg-gray-50'>
        <Header />
        <div className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto px-4 md:px-6">
            <div className='h-full'></div>
            <div className="pb-6">
                <Input />
            </div>
</div>
    </div>
  )
}

export default ChatContainer
