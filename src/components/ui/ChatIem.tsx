import { useNavigate, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";
import MenuDrop from "./MenuDrop";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import useMessage from "../../hooks/useMessage";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface ChatItemProps {
    chatName:string, 
    chatID?:string, 
}

function ChatIem({ chatName, chatID }: ChatItemProps) {

    const {user} = useUser() as any

    const navigate = useNavigate()
    const {id} = useParams() as {id:string}
    
    const [openMenu, setOpenMenu] = useState(false)
    const [name, setName] = useState(labelHandler(chatName))

    const {deleteChat,setDeleteChat} = useMessage() as any
    const {setIsOpen,setIsRenaming, isRenaming} = useControl() as any

    const currentChat = deleteChat === chatID

    function labelHandler(label: string) {
        if (label.length < 20) {
            return label;
        }
        return label.slice(0, 20) + "....";
    }

    function onClickElipses() {
        setOpenMenu((prev) => !prev)
    }

    let container = document.querySelector(".main-container")
    if(container) {
        container?.addEventListener("click" , () => {
        setOpenMenu(false)
        })
    }


      async function OnRename() {
        try {
          if(name.length === 0) {
            return;
         } 
          await axios.patch(`http://localhost:8001/api/rename/${chatID}?user_id=${user?.id}`, {
            chat_name : name
          })
          navigate(0)
        } catch (error) {
          console.log("Unable to rename the chat name. Try again later", error)
        }
      }


    function handleRenaming(e:React.ChangeEvent) {
        setName((e.target as HTMLInputElement).value)
    }

    function handleClick() {
        navigate(`/${chatID}`);
        setIsOpen(false);
        setIsRenaming(false)
        setDeleteChat(null)
    }


    return (
        <div 
            className={`w-full rounded-md flex items-center justify-start px-2 py-[0.35rem] hover:bg-gray-200 cursor-pointer ${id === chatID && "bg-gray-300 hover:bg-gray-300"}`}
        >
            <input 
                type="text" 
                value={name}
                onChange={isRenaming && currentChat ? handleRenaming : undefined}
                className={`input-field text-sm w-full p-[0.2rem] ${isRenaming && currentChat ? "outline-1 outline-gray-400 rounded-sm" : "outline-none cursor-pointer" } `} 
                onClick={isRenaming && currentChat ? undefined : handleClick}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && isRenaming && currentChat) {
                        OnRename()
                    }
                }}
                readOnly={isRenaming && currentChat ? false : true}
            />
                    
            <section className="relative flex items-center justify-center" onClick={onClickElipses }>
                <Ellipsis size={15} />
                {openMenu && <MenuDrop  chatName={chatName} chatID={chatID} />}
            </section>
            
        </div>
    );
}

export default ChatIem