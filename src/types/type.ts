
export interface InputProps {
    message:string,
    fileName?: string,
}

export interface MessageProps {
    user: string | {message:string, file:string | null} ;
    ai: string;
    message_id:string, 
    user_query:string, 
    ai_response:string,
    fileName?:string,
    fileType?:"pdf" | "txt"
}

export interface ChatProps {
    chat_id:string, 
    chat_name:string, 
    user:string,
}

export interface DeleteChatProp {
    chat_id:string
}

export interface UserDataProps {
    user_id:string, 
    user_name:string, 
    chats:ChatProps[]
}

