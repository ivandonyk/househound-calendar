"use client"

import { DayHeaderContentArg } from "@fullcalendar/core/index.js"
import classNames from "classnames"
import moment from "moment"
import React from "react"

const CalendarDayHeader: React.FC<DayHeaderContentArg> = (props) => {
    const isStartOfWeek = moment(props.date).isoWeekday() === 7
    const isEndOfWeek = moment(props.date).isoWeekday() === 6

    return (
        <div className={classNames(
            "flex flex-col justify-center items-center bg-primary-blue p-0 w-full h-[90px] text-white text-[18px] font-[400]",
            { "rounded-l-[10px]": isStartOfWeek },
            { "rounded-r-[10px]": isEndOfWeek }
        )}>
            <div>{moment(props.date).format("ddd")}</div>
            <div>{moment(props.date).format("DD")}</div>
        </div>
    )
}

export default CalendarDayHeader