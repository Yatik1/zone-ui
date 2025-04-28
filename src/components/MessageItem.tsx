import { Sparkles } from "lucide-react";
import { easeIn, motion } from "motion/react"
import { marked } from "marked";

interface Message {
    user: string;
    ai: string;
  }
  
  function MessageItem({ chat }: { chat: Message }) {

    const renderMarkdown = (text:string) => {
      return {__html: marked(text)}
    }

    return (
      <div className="flex flex-col w-full gap-2 animate-fade-in">
        
        <div className="flex justify-end w-full">
          
          <div 
            className="bg-linear-to-b from-black via-zinc-700 to-zinc-500 text-white px-4 py-2 rounded-2xl max-w-[70%]"
            dangerouslySetInnerHTML={renderMarkdown(chat?.user)}
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
            className="bg-white text-black border border-gray-200 px-4 py-2 h-fit rounded-2xl shadow-xs/10 w-fit"
            dangerouslySetInnerHTML={renderMarkdown(chat?.ai)}
          />
        </div>
      </div>
    );
  }
  
  export default MessageItem;
  