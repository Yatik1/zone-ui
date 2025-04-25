import { Sparkles } from "lucide-react";
import { easeIn, motion } from "motion/react"

interface Message {
    user: string;
    ai: string;
  }
  
  function MessageItem({ chat }: { chat: Message }) {
    return (
      <div className="flex flex-col w-full gap-2 animate-fade-in">
        
        <div className="flex justify-end w-full">
          
          <div 
            className="bg-blue-900 text-white px-4 py-2 rounded-2xl shadow-md max-w-[70%]"
          >
            {chat?.user}
          </div>
        </div>
        
        <div className="flex items-center gap-3 justify-start w-full">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeIn }}
            className="bg-white text-black border border-gray-200 px-4 py-2 rounded-2xl shadow max-w-[70%]"
          >
            {chat?.ai}
          </motion.div>
        </div>
      </div>
    );
  }
  
  export default MessageItem;
  