"use client"

import { PickersCalendarHeaderProps } from "@mui/x-date-pickers"
import { Moment } from "moment"
import Image from "next/image"
import React from "react"

import rightChevronGraySvg from "@/public/whiteRightChevron.svg"
import leftChevronGraySvg from "@/public/whiteLeftChevron.svg"

const CalendarHeaderMui: React.FC<PickersCalendarHeaderProps<Moment>> = ({ currentMonth, onMonthChange }) => {
    return (
        <div className="flex flex-row gap-[10px] pt-3 mr-auto ml-auto mb-[20px]">
            <Image 
                className="cursor-pointer"
                src={leftChevronGraySvg}
                alt=""
                onClick={() => onMonthChange(currentMonth.clone().add(-1, "month"), "right")}
            />
            <div className="font-[500] text-[16px] leading-[22px] text-blue-7">
                {currentMonth.format("MMMM, yyyy")}
            </div>
            <Image
                className="cursor-pointer"
                src={rightChevronGraySvg}
                alt=""
                onClick={() => onMonthChange(currentMonth.clone().add(1, "month"), "left")}
            />
        </div>
    )
}

export default CalendarHeaderMui
