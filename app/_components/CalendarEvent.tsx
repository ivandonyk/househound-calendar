"use client"

import { EventContentArg } from "@fullcalendar/core/index.js"
import React from "react"
import moment from "moment"

const CalendarEvent: React.FC<EventContentArg> = (props) => {
    console.log(props.event.end)
    return (
        <div className="w-full min-h-max bg-light-gray flex flex-col justify-center p-2">
            <div className="text-black font-[500] text-[14px] overflow-hidden truncate">{props.event.title}</div>
            <div className="text-black font-[400] text-[13px] flex flex-row gap-[2px]">
                <div>{moment(props.event.start).format("h:mm A")}</div>
                <div>-</div>
                <div>{moment(props.event.end).format("h:mm A")}</div>
            </div>
        </div>
    )
}

export default CalendarEvent