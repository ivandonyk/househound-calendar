"use client"

import Image from "next/image"
import moment from "moment"
import React from "react"

import { ICalendarHeaderProps } from "@/app/_types/components"

import calendarHeaderSvg from "@/public/calendarHeader.svg"
import chevronRightSvg from "@/public/chevronRight.svg"
import chevronLeftSvg from "@/public/chevronLeft.svg"

const CalendarHeader: React.FC<ICalendarHeaderProps> = ({ onBack, onNext, calendarDate }) => {

    if(!calendarDate?.start || !calendarDate.end) return <></>
    return (
        <div className="flex flex-col justify-between mb-[30px] pl-[60px]">
            <div className="flex flex-row items-center">
                <Image src={calendarHeaderSvg} alt="" />
                <div className="font-[500] text-[25px] leading-[25px] text-white m-[10px]">Calendar</div>
            </div>
            <div className="flex flex-row gap-[19px] items-center ml-auto">
                <div className="cursor-pointer p-2" onClick={onBack}>
                    <Image src={chevronLeftSvg} alt="" />
                </div>
                <div className="font-[400] text-white text-[18px] flex flex-row gap-2 leading-[24px]">
                    <div>{moment(calendarDate.start).format("MMMM")}</div>
                    <div>
                        {moment(calendarDate.start).format("DD")}-{moment(calendarDate.end).format("DD")}
                    </div>
                </div>
                <div className="cursor-pointer p-2" onClick={onNext}>
                    <Image src={chevronRightSvg} alt="" />
                </div>
            </div>
        </div>
)
}

export default CalendarHeader
