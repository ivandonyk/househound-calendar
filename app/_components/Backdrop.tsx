"use client"

import React from "react"
import classNames from "classnames"

import { IBackdropProps } from "@/app/_types/components"

const Backdrop: React.FC<IBackdropProps> = ({ className, onClick }) => {
    return (
        <div 
            className={classNames(
                "w-[100%] h-screen absolute inset-0 bg-[#00000040]",
                className
            )}
            onClick={onClick}
        />
    )
}

export default Backdrop