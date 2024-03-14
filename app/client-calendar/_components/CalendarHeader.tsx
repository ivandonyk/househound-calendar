"use client"

import { PickersCalendarHeaderProps } from "@mui/x-date-pickers"
import { Moment } from "moment"
import Image from "next/image"
import React from "react"

import rightChevronGraySvg from "@/public/rightChevronGray.svg"
import leftChevronGraySvg from "@/public/leftChevronGray.svg"

const CalendarHeader: React.FC<PickersCalendarHeaderProps<Moment>> = ({ currentMonth, onMonthChange }) => {
    return (
        <div className="flex flex-row gap-2 pt-3 mr-auto md:ml-auto mb-[10px] md:mb-[20px] md:mr-[3vw]">
            <Image 
                className="hidden md:block cursor-pointer"
                src={leftChevronGraySvg}
                alt=""
                onClick={() => onMonthChange(currentMonth.clone().add(-1, "month"), "right")}
            />
            <div className="font-[400] md:font-[600] text-[14px] leading-[22px] text-black-3">
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

export default CalendarHeader
