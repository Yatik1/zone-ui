import { createContext, useState } from "react"

interface MessageProps {
    message:string
}

interface ChatProps {
    query:string, 
    response: string
}

type MessageContextProps =  {
    chats: ChatProps[],
    setChats:React.Dispatch<React.SetStateAction<ChatProps[]>> ,
    // chat:ChatProps | null,
    // setChat:React.Dispatch<React.SetStateAction<ChatProps | null>>,
    message: MessageProps | null,
    setMessage:React.Dispatch<React.SetStateAction<MessageProps | null>>
}

export const MessageContext = createContext<MessageContextProps | null>(null)

export default function MessagesProvider({children} : {children:React.ReactNode}) {
    const [chats, setChats] = useState<ChatProps[]>([])
    const [message, setMessage] = useState<MessageProps | null>(null)
    // const [chat, setChat] = useState<ChatProps | null>(null)

    return (
        <MessageContext.Provider value={{message, chats, setMessage, setChats}}>
            {children}
        </MessageContext.Provider>
    )

}