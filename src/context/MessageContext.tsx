import React, { createContext, useState } from "react"
import { MessageProps, InputProps, ChatProps, DeleteChatProp } from "../types/type";

export type MessageContextProps =  {
    messages: MessageProps[],
    setMessages:React.Dispatch<React.SetStateAction<MessageProps[]>> ,
    message: InputProps | null,
    setMessage:React.Dispatch<React.SetStateAction<InputProps | null>>
    chats: ChatProps[],
    setChats:React.Dispatch<React.SetStateAction<ChatProps[]>>
    newChat?: ChatProps | null,
    setNewChat?: React.Dispatch<React.SetStateAction<ChatProps | null>>,
    deleteChat?: DeleteChatProp | null,
    setDeleteChat:React.Dispatch<React.SetStateAction<DeleteChatProp | null>>
}

export const MessageContext = createContext<MessageContextProps | null>(null)

export default function MessagesProvider({children} : {children:React.ReactNode}) {
    const [messages, setMessages] = useState<MessageProps[]>([])
    const [message, setMessage] = useState<InputProps | null>(null)
    const [chats, setChats] = useState<ChatProps[]>([])
    const [newChat, setNewChat] = useState<ChatProps | null>(null)
    const [deleteChat, setDeleteChat] = useState<DeleteChatProp | null>(null)

    return (
        <MessageContext.Provider value={{message, messages, setMessage, setMessages, chats, setChats, newChat, setNewChat, deleteChat, setDeleteChat}}>
            {children}
        </MessageContext.Provider>
    )

}