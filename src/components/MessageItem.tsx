interface Message {
    user: string;
    ai: string;
  }
  
  function MessageItem({ chat }: { chat: Message }) {
    return (
      <div className="flex flex-col w-full gap-2 animate-fade-in">
        
        <div className="flex justify-end w-full">
          <div className="bg-blue-900 text-white px-4 py-2 rounded-2xl shadow-md max-w-[70%]">
            {chat?.user}
          </div>
        </div>
        
        <div className="flex justify-start w-full">
          <div className="bg-white text-black border border-gray-200 px-4 py-2 rounded-2xl shadow max-w-[70%]">
            {chat?.ai}
          </div>
        </div>
      </div>
    );
  }
  
  export default MessageItem;
  