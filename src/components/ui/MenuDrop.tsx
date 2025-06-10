import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { Pen, Share, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useMessage from "../../hooks/useMessage"

function MenuDrop({chatName, chatID} : {chatName:string, chatID?:string}) {

  const {user} = useUser()
  const {chats} = useMessage() as any
  const navigate = useNavigate()

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8001/api/delete/chat/${chatID}?user_id=${user?.id}`)
      navigate("/")
      navigate(0)
      
    } catch (error) {
      console.log("Error occured during deleting the chat", error)
    }
  }

  return (
    <div className="w-[7rem] absolute z-10 top-[1rem] bg-white border border-gray-200 rounded-xl px-2 py-1.5 flex flex-col items-center justify-center">
        <span className="flex items-center justify-center p-1 w-full gap-2 hover:bg-gray-50" onClick={() => console.log({chatName,chatID})}>
            <Pen size={15} /> 
            <p className="text-sm">Rename</p>
        </span>

        <span className="flex items-center justify-center p-1 w-full gap-2 hover:bg-gray-50" onClick={() => console.log(chats)}>
            <Share size={15} /> 
            <p className="text-sm">Share</p>
        </span>

        <span className="flex items-center justify-center p-1 w-full gap-2 text-red-500 hover:bg-gray-50" onClick={onDelete}>
            <Trash size={15} /> 
            <p className="text-sm">Delete</p>
        </span>
    </div>
  )
}

export default MenuDrop