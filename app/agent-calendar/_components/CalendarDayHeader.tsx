"use client"

import { DayHeaderContentArg } from "@fullcalendar/core/index.js"
import classNames from "classnames"
import moment from "moment"
import React from "react"

const CalendarDayHeader: React.FC<DayHeaderContentArg> = (props) => {
    const isCurrentWeekDay = moment(props.date).isoWeekday() === moment().isoWeekday()
    const isPastWeekDay = moment(props.date).isoWeekday() < moment().isoWeekday()
    const isFutureWeekDay = moment(props.date).isoWeekday() > moment().isoWeekday()

    return (
        <div className="h-[36px] w-full z-20 bg-white pb-[6px]">
            <div className={classNames(
                "w-full h-full flex flex-row items-center justify-center",
                { "bg-blue-1 text-white rounded-md": isCurrentWeekDay },
                { "bg-white": !isCurrentWeekDay }
            )}>
                <div
                    className={classNames(
                        "text-[15x] leading-[22px] mr-2",
                        { "font-[500]": isCurrentWeekDay },
                        { "font-[400] text-gray-6": isPastWeekDay },
                        { "font-[400]": isFutureWeekDay }
                    )}
                >
                    {moment(props.date).format("ddd").toUpperCase()}
                </div>
                <div
                    className={classNames(
                        "text-[15x] leading-[22px]",
                        { "font-[400] text-gray-6": isPastWeekDay },
                        { "font-[500] ": !isPastWeekDay }
                    )}
                >
                    {moment(props.date).format("DD")}
                </div>
            </div>
        </div>
    )
}

export default CalendarDayHeader