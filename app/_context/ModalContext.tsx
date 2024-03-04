"use client"

import React, { 
    createContext, 
    useContext, 
    useState 
} from "react"

import Modals from "@/app/_modals/Modals"

import { Modals as ModalsEnum } from "@/app/_constants/constants"

import { IModalsContext } from "@/app/_types/context"

const ModalContext = createContext<IModalsContext>({
    activeModal: null,
    setActiveModal: () => {},
})
export const useModalContext = () => useContext(ModalContext)

const ModalsProvider: React.FC<React.PropsWithChildren> =  ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalsEnum | null>(null)

    return (
        <ModalContext.Provider value={{ activeModal, setActiveModal }}>
            <Modals />
            {children}
        </ModalContext.Provider>
    )
}

export default ModalsProvider
