import { File, X } from 'lucide-react'

function FileSegment({fileName, remove, bg}:{fileName:string, remove?:() => void, bg?:string}) {
  return (
    <div>
        <div className={`relative min-w-[13rem] w-auto h-fit flex items-center justify-start rounded-lg border border-stone-300 gap-2 p-1 ${bg ? `bg-${bg}` : "bg-gray-50" }`}>
            <div className="w-fit h-fit px-2 py-2 flex items-center justify-center bg-[#4A87ED] rounded-md text-white">
                <File />
            </div>
            <p className='text-md'>{fileName}</p>
            {
                remove && (
                    <button className='absolute right-[-5px] top-[-5px] bg-white rounded-full group flex items-center justify-center text-black cursor-pointer p-[0.15rem] border border-gray-400' onClick={remove}>
                        <X className='w-[10px] h-[10px]' />
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default FileSegment