import { File, FileText, X } from 'lucide-react'

function FileSegment({fileName, fileType ,remove}:{fileName:string, remove?:() => void, bg?:string, fileType?:string}) {
    
    

  return (
    <div>
        <div className={`relative min-w-[13rem] w-fit h-fit flex items-center justify-start rounded-lg border border-stone-300 gap-2 p-1 bg-white }`}>
            <div className={`w-fit h-fit px-2 py-2 flex items-center justify-center bg-gradient-to-br ${fileName?.includes(".pdf") || fileType==="pdf" ?  "from-pink-600 via-pink-500 to-pink-400" : "from-blue-500 via-blue-400 to-blue-300"} rounded-md text-white`}>
                {
                    fileName?.includes(".pdf") || fileType === "pdf" ? <File /> : <FileText />
                }
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