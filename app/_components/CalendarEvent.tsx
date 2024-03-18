"use client"

import { EventContentArg } from "@fullcalendar/core/index.js"
import moment from "moment"
import React from "react"

const CalendarEvent: React.FC<EventContentArg> = (props) => {
    return (
        <div 
            className="w-full min-h-max h-full bg-light-gray rounded-md cursor-pointer flex flex-col justify-center p-2"
        >
            <div className="text-black font-[500] text-[14px] overflow-hidden truncate">{props.event.title}</div>
            <div className="text-black font-[400] text-[13px] flex flex-row gap-[2px]">
                <div>{moment(props?.event?._instance?.range?.start).utc().format("h:mm A")}</div>
                <div>-</div>
                <div>{moment(props?.event?._instance?.range?.end).utc().format("h:mm A")}</div>
            </div>
        </div>
    )
}

export default CalendarEvent