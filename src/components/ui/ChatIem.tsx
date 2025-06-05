import { useNavigate, useParams } from "react-router-dom";
import useControl from "../../hooks/useControl";

interface ChatItemProps {
    chatName:string, 
    chatID?:string, 
}

function ChatIem({ chatName, chatID }: ChatItemProps) {

    const navigate = useNavigate()
    const {id} = useParams() as {id:string}
    
    const {setIsOpen} = useControl() as any

    function labelHandler(label: string) {
        if (label.length < 20) {
            return label;
        }
        return label.slice(0, 20) + "....";
    }

    return (
        <div 
            className={`w-full rounded-md flex items-center justify-start px-2 py-[0.35rem] hover:bg-gray-200 cursor-pointer ${id === chatID ? "bg-gray-300 hover:bg-gray-300" : ""}`}
            onClick={() => {navigate(`/${chatID}`); setIsOpen(false);}}
        >
            <p className="text-[0.9rem]">{labelHandler(chatName)}</p>
        </div>
    );
}

export default ChatIem