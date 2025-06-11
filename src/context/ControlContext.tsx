import React, { useState } from "react"

interface FlagProps {
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    alertOn:boolean,
    setAlertOn:React.Dispatch<React.SetStateAction<boolean>>,
    isRenaming:boolean,
    setIsRenaming:React.Dispatch<React.SetStateAction<boolean>>
}

export const ControlContext = React.createContext<FlagProps | null>(null)

export default function ControlProvider({children} : {children:React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [alertOn, setAlertOn] = useState<boolean>(false)
    const [isRenaming, setIsRenaming] = useState<boolean>(false)

    return (
        <ControlContext.Provider value={{isOpen, setIsOpen, alertOn, setAlertOn, isRenaming, setIsRenaming}}>
            {children}
        </ControlContext.Provider>
    )
}
