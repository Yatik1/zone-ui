import useControl from "../../hooks/useControl"
import useMessage from "../../hooks/useMessage"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FlagProps } from "../../context/ControlContext"
import { MessageContextProps } from "../../context/MessageContext"

function ModalAlert() { 

    const BACKEND_DB = import.meta.env.VITE_BACKEND_DB
    const {setAlertOn} = useControl() as FlagProps
    const {deleteChat} = useMessage() as MessageContextProps

    const {user} = useUser()
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
            await axios.delete(`${BACKEND_DB}/api/delete/chat/${deleteChat?.chat_id}?user_id=${user?.id}`)
            navigate("/")
            navigate(0)
        } catch (error) {
            console.log("Error occured during deleting the chat", error)
        }
    }


  return (
    <div className="w-full h-screen absolute z-10 bg-gray-500/50 flex items-center justify-center">
        <main className="bg-white rounded-xl">
            <h1 className="text-[1rem] text-zinc-600 font-semibold tracking-tight p-5">Delete chat?</h1>
            <hr className="text-gray-300 w-[100%]" />
            <div className="flex flex-col text-center items-start justify-center p-3 tracking-tighter">
                <p className="text-md text-gray-600">This action will delete all your messages with in the chat.</p>
                <p className="text-sm text-gray-400 ">Are you sure about deleting this chat?</p>
            </div>
            <section className="flex items-center justify-end gap-2 mt-2 mb-3 mr-2">
                <button 
                    className="flex items-center justify-center bg-white border border-gray-200 px-6 py-2 rounded-lg" 
                    onClick={() => setAlertOn(false)}
                >
                    Cancel
                </button>

                <button 
                    className="flex items-center justify-center bg-red-500 text-white px-6 py-2 rounded-lg"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </section>
        </main>
    </div>
  )
}

export default ModalAlert