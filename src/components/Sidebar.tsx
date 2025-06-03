import { PanelLeftClose } from "lucide-react"
import useControl from "../hooks/useControl"


function Sidebar() {
    const {setIsOpen} = useControl() as any

  return (
    <div className="w-[25rem] h-screen bg-gray-50 border-r border-gray-200 ">
        <div className="flex items-center justify-between border-b border-gray-200 p-2.5">
            <h2 className="flex items-center justify-center text-2xl font-semibold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-500 bg-clip-text text-transparent">
                Zone
            </h2>
            <section className="flex items-center justify-center text-gray-500">
                <PanelLeftClose size={20} onClick={() => setIsOpen(false)} />
            </section>
        </div>
    </div>
  )
}

export default Sidebar