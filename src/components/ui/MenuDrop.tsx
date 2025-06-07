import { Pen, Share, Trash } from "lucide-react"

function MenuDrop({chatName, chatID} : {chatName:string, chatID?:string}) {
  return (
    <div className="w-[7rem] absolute z-10 top-2 bg-white border border-gray-200 rounded-xl px-2 py-1.5 flex flex-col items-center justify-center">
        <span className="flex items-center justify-center p-1 w-full gap-2" onClick={() => console.log({chatName,chatID})}>
            <Pen size={15} /> 
            <p className="text-sm">Rename</p>
        </span>

        <span className="flex items-center justify-center p-1 w-full gap-2">
            <Share size={15} /> 
            <p className="text-sm">Share</p>
        </span>

        <span className="flex items-center justify-center p-1 w-full gap-2 text-red-500">
            <Trash size={15} /> 
            <p className="text-sm">Delete</p>
        </span>
    </div>
  )
}

export default MenuDrop