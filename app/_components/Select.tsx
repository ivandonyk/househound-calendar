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
                    "w-[100px] h-[44px] rounded-[5px] border-[0.7px] border-gray-8 text-black-3 bg-transparent",
                    "font-[400] text-[16px] leading-[20px]",
                    "p-[12px]" 
                )}
                value={selected}
                onFocus={() => setActive(true)}
            />
            {active ? <div className="absolute cursor-pointer flex flex-col gap-[10px] h-[150px] overflow-auto top-[50px] w-[110px] rounded-md bg-white px-[9px] py-[10px]">
                {options.map(op => <div 
                    className="font-[500] text-[14px] leading-[20px] text-black-3 hover:bg-gray-100" 
                    onClick={() => {
                        setSelected(op)
                        setActive(false)
                        onChange?.(op)
                    }}
                    key={op}
                >{op}</div>)}
            </div>: <></>}
        </div>
    )
}

export default Select