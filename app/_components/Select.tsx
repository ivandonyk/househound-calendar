"use client"

import classNames from "classnames"
import React, { useEffect, useState } from "react"

import { ISelectProps } from "@/app/_types/components"

const Select: React.FC<ISelectProps> = ({ 
    options,
    onChange,
    value
 }) => {
    const [selected, setSelected] = useState("")
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(value) setSelected(value)
    }, [value])

    useEffect(() => {
        const listener = () => {}
        document.addEventListener("click" , e => {

        })
    }, [])

    return (
        <div className="relative">
            <input
                className={classNames(
                    "w-[75px] h-[30px] md:w-[100px] md:h-[44px] rounded-[5px] border-[0.7px] border-gray-8 text-black-3 bg-transparent",
                    "font-[400] text-[14px] md:text-[16px] leading-[20px]",
                    "px-[5px] py-[8px] md:px-[12px] md:py-[12px]" 
                )}
                value={selected}
                onFocus={() => setActive(true)}
            />
            {active ? <div className="absolute z-20 cursor-pointer flex flex-col gap-[10px] h-[150px] overflow-auto top-[50px] w-[110px] rounded-md bg-white px-[9px] py-[10px]">
                {options.map(op => <div 
                    className="font-[500] text-[14px] leading-[20px] text-black-3 hover:bg-gray-100" 
                    onClick={() => {
                        setSelected(op.format('h:mm A').toLowerCase())
                        setActive(false)
                        onChange?.(op)
                    }}
                    key={op.format('h:mm A').toLowerCase()}
                >{op.format('h:mm A').toLowerCase()}</div>)}
            </div>: <></>}
        </div>
    )
}

export default Select