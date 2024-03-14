"use client"

import Image from "next/image"
import React from "react"

import { IWeeklyHeaderProps } from "@/app/_types/components"

import rightChevronGraySvg from "@/public/whiteRightChevron.svg"
import leftChevronGraySvg from "@/public/whiteLeftChevron.svg"

const WeeklyHeader: React.FC<IWeeklyHeaderProps> = ({
    selectedDate,
    onBack,
    onNext,
}) => {
    return (
        <div className="flex flex-row gap-[10px] pt-3 mr-auto ml-auto mb-[20px]">
            <Image 
                className="cursor-pointer"
                src={leftChevronGraySvg}
                alt=""
                onClick={onBack}
            />
            <div className="font-[500] text-[16px] leading-[22px] text-blue-7">
                {selectedDate?.format("dddd, DD MMMM, yyyy")}
            </div>
            <Image
                className="cursor-pointer"
                src={rightChevronGraySvg}
                alt=""
                onClick={onNext}
            />
        </div>
    )
}

export default WeeklyHeader
