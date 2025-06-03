import { useContext } from "react";
import { ControlContext } from "../context/ControlContext";

function useControl() {
    const context = useContext(ControlContext)
    return context
}

export default useControl