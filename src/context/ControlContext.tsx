import React from "react"

interface FlagProps {
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const ControlContext = React.createContext<FlagProps | null>(null)

export default function ControlProvider({children} : {children:React.ReactNode}) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return (
        <ControlContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </ControlContext.Provider>
    )
}
