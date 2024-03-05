"use client"

import { DayHeaderContentArg } from "@fullcalendar/core/index.js"
import classNames from "classnames"
import moment from "moment"
import React from "react"

const CalendarDayHeader: React.FC<DayHeaderContentArg> = (props) => {
    const isStartOfWeek = moment(props.date).isoWeekday() === 1
    const isEndOfWeek = moment(props.date).isoWeekday() === 7

    return (
        <div className={classNames(
            "flex flex-col items-center bg-primary-blue p-0 pt-[12px] pb-[21px] w-full h-[93px] text-white text-[18px] font-[400]",
            { "rounded-l-[10px]": isStartOfWeek },
            { "rounded-r-[10px]": isEndOfWeek }
        )}>
            <div
                className="font-[400] text-[18px] leading-[35px] mb-auto"
            >
                {moment(props.date).format("ddd").toUpperCase()}
            </div>
            <div
                className="font-[400] text-[18px] leading-[28px]"
            >
                {moment(props.date).format("DD")}
            </div>
        </div>
    )
}

export default CalendarDayHeader