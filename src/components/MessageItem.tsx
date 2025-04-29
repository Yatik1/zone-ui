import { File, Sparkles } from "lucide-react";
import { easeIn, motion } from "motion/react"
import { marked } from "marked";
import FileSegment from "./ui/FileSegment";

interface Message {
    user: string | any;
    ai: string;
  }
  
  function MessageItem({ chat }: { chat: Message }) {

    const renderMarkdown = (text:string) => {
      return {__html: marked(text)}
    }

    return (
      <div className="flex flex-col w-full gap-2 animate-fade-in">
        
        <div className="flex flex-col gap-2 items-end justify-end w-full">
        {chat?.user?.file && (
          <div className="flex w-full items-end justify-end">
              <FileSegment fileName={chat.user?.file} bg="white" />
          </div>
        )}
          <div 
            className="bg-white text-black border border-gray-200 px-4 py-2 rounded-2xl max-w-[70%]"
            dangerouslySetInnerHTML={renderMarkdown(chat?.user.message)}
          >
          </div>
        </div>
        
        <div className="flex items-start gap-3 justify-start w-full">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeIn }}
            className="bg-linear-to-br from-black via-stone-700 to-stone-500 text-white px-4 py-2 h-fit rounded-2xl shadow-xs/10 w-fit max-w-[70%] "
            dangerouslySetInnerHTML={renderMarkdown(chat?.ai)}
          />
        </div>
      </div>
    );
  }
  
  export default MessageItem;
  