import { useNavigate, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";
import MenuDrop from "./MenuDrop";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

interface ChatItemProps {
    chatName:string, 
    chatID?:string, 
}

function ChatIem({ chatName, chatID }: ChatItemProps) {

    const navigate = useNavigate()
    const {id} = useParams() as {id:string}
    
    const [openMenu, setOpenMenu] = useState(false)
    
    const {setIsOpen} = useControl() as any

    function labelHandler(label: string) {
        if (label.length < 20) {
            return label;
        }
        return label.slice(0, 20) + "....";
    }

    return (
        <div 
            className={`w-full rounded-md flex items-center justify-start px-2 py-[0.35rem] hover:bg-gray-200 cursor-pointer ${id === chatID && "bg-gray-300 hover:bg-gray-300"}`}
        >
            <p className="text-sm w-full" onClick={() => {navigate(`/${chatID}`); setIsOpen(false);}}>{labelHandler(chatName)}</p>
            <section className="relative flex items-center justify-center" onClick={() => setOpenMenu(!openMenu)}>
                <Ellipsis size={15} />
                {openMenu && <MenuDrop  chatName={chatName} chatID={chatID} />}
            </section>
            
        </div>
    );
}

export default ChatIem