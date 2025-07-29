import { easeIn, motion } from "motion/react"
import { marked } from "marked";
import FileSegment from "./ui/FileSegment";
import { MessageProps } from "../types/type";
  
  function MessageItem({ chat }: { chat: MessageProps }) {

    const renderMarkdown = (text:string) => {
      return {__html: marked(text)}
    }
    
    return (
      <div className="flex flex-col w-full gap-2 animate-fade-in">
        
        <div className="flex flex-col gap-2 items-end justify-end w-full">
        {(chat.fileName || (typeof chat.user === "object" && chat.user !== null && "file" in chat.user)) && (
  <div className="flex w-full items-end justify-end">
    <FileSegment fileName={chat.fileName || (typeof chat.user === "object" && chat.user !== null && "file" in chat.user ? (chat.user as { file: string }).file : undefined)} fileType={chat.fileType} bg="white" />
  </div>
)}

          <div 
            className="bg-gray-200 text-black px-4 py-2 rounded-2xl max-w-[70%]"
            dangerouslySetInnerHTML={renderMarkdown(
              chat.user_query ||
              (typeof chat.user === "object" && chat.user !== null && "message" in chat.user
                ? (chat.user as { message: string }).message
                : typeof chat.user === "string"
                  ? chat.user
                  : "")
            )}
          >
          </div>
        </div>
        
        <div className="flex items-center gap-3 justify-start w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeIn }}
            className=" px-4 py-2 w-full"
            dangerouslySetInnerHTML={renderMarkdown(chat.ai_response || chat?.ai)}
          />
        </div>
      </div>
    );
  }
  
  export default MessageItem;
  