"use client"

import React from "react"
import classNames from "classnames"

import { IModalLayoutProps } from "@/app/_types/components"

import { useModalContext } from "@/app/_context/ModalContext"

import Backdrop from "./Backdrop"

const ModalLayout: React.FC<IModalLayoutProps> = ({ modal, children, onClose }) => {
    const { activeModal, setActiveModal } = useModalContext()

    const handleCloseModal = () => {
        setActiveModal(null)
        onClose?.()
    }

    return (
        <div 
            className={classNames(
                "absolute top-0 left-0 w-[100%] h-screen flex justify-center items-center z-10",
                { "hidden": activeModal !== modal }
            )}
        >
            <Backdrop onClick={handleCloseModal} />
            {children}
        </div>
    )
}

export default ModalLayout