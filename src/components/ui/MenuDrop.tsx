import { Pen, Share, Trash } from "lucide-react"
import useMessage from "../../hooks/useMessage"
import useControl from "../../hooks/useControl"

function MenuDrop({chatID} : {chatID?:string}) {

  const {chats,setDeleteChat} = useMessage() as any
  const {setAlertOn,setIsRenaming} = useControl() as any

  return (
    <div className="w-[7rem] absolute z-10 top-[1rem] bg-white border border-gray-200 rounded-xl px-2 py-1.5 flex flex-col items-center justify-center">
        <span className="flex items-center justify-start p-1 w-full gap-2 hover:bg-gray-50" onClick={() => {setIsRenaming(true);setDeleteChat(chatID)}}>
            <Pen size={15} /> 
            <p className="text-sm">Rename</p>
        </span>

        <span className="flex items-center justify-start p-1 w-full gap-2 hover:bg-gray-50" onClick={() => console.log(chats)}>
            <Share size={15} /> 
            <p className="text-sm">Share</p>
        </span>

        <span className="flex items-center justify-start p-1 w-full gap-2 text-red-500 hover:bg-gray-50" onClick={() => {setAlertOn(true); setDeleteChat(chatID);}}>
            <Trash size={15} /> 
            <p className="text-sm">Delete</p>
        </span>
    </div>
  )
}

export default MenuDrop