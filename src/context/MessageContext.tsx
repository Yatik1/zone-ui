import React, { createContext, useState } from "react"

interface InputProps {
    message:string
}

interface MessageProps {
    query:string, 
    response: string
}

interface ChatProps {
    chat_id:string, 
    chat_name:string, 
    user:string,
}

type MessageContextProps =  {
    messages: MessageProps[],
    setMessages:React.Dispatch<React.SetStateAction<MessageProps[]>> ,
    message: InputProps | null,
    setMessage:React.Dispatch<React.SetStateAction<InputProps | null>>
    chats: ChatProps[],
    setChats:React.Dispatch<React.SetStateAction<ChatProps[]>>
}

export const MessageContext = createContext<MessageContextProps | null>(null)

export default function MessagesProvider({children} : {children:React.ReactNode}) {
    const [messages, setMessages] = useState<MessageProps[]>([])
    const [message, setMessage] = useState<InputProps | null>(null)
    const [chats, setChats] = useState<ChatProps[]>([])

    return (
        <MessageContext.Provider value={{message, messages, setMessage, setMessages, chats, setChats}}>
            {children}
        </MessageContext.Provider>
    )

}