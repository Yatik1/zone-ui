import { PanelLeftClose, Pencil } from "lucide-react"
import useControl from "../hooks/useControl"
import useMessage from "../hooks/useMessage"
import ChatItem from "./ui/ChatIem"
import axios from "axios"
import { useClerk } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

function Sidebar() {
    const {setIsOpen} = useControl() as any

  return (
    <div className="w-[18rem] h-screen bg-[#F9F9F9] border-r border-gray-200 ">
        <div className="flex items-center justify-between border-b border-gray-200 p-2.5 h-13">
            <h2 className="flex items-center justify-center text-2xl font-semibold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent">
                Zone
            </h2>
            <section className="flex items-center justify-center text-gray-500">
                <PanelLeftClose size={20} onClick={() => setIsOpen(false)} />
            </section>
        </div>
        <ChatBar />
    </div>
  )
}

function ChatBar() {

     const {chats} = useMessage() as any
     const {user} = useClerk()

     const navigate = useNavigate()

    return (
        <div className="flex flex-col items-start justify-start gap-y-2 mt-4 p-2 sidebar">
            {user && (
                <div 
                className="w-full rounded-md flex items-center justify-start p-2 gap-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => {navigate("/"); navigate(0)}}
            >
                    <Pencil size={14}  />
                    <p className="text-[0.9rem]">New Chat</p>
            </div>
            )}
            <p className="text-sm text-gray-500">Chats</p>
            <section className="flex flex-col items-start justify-center w-full">
                {chats?.map((chat:any) => (
                <span key={chat.chat_id} className="w-full">
                    <ChatItem chatName={chat.chat_name} chatID={chat.chat_id} />
                </span>
            ))}
            </section>
        </div>
    )
}

export default Sidebar