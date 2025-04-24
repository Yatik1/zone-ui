import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function useMessage() {
    const context = useContext(MessageContext)
    return context
}

export default useMessage