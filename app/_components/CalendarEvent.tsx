"use client"

import { EventContentArg } from "@fullcalendar/core/index.js"
import classNames from "classnames"
import moment from "moment"
import React from "react"

import useScreen from "@/app/_hooks/useScreen"

const CalendarEvent: React.FC<EventContentArg> = (props) => {
    const { width } = useScreen()
    return (
        <div 
            className="w-full min-h-max h-full bg-light-gray rounded-md cursor-pointer flex flex-col justify-center p-2"
        >
            <div className="text-black font-[500] text-[14px] overflow-hidden truncate">{props.event.title}</div>
            <div className={classNames(
                "text-black font-[400] flex flex-row gap-[2px]",
                { "text-[13px]": width >= 1110 },
                { "text-[10px]": width < 1110 && width > 910 },
                { "text-[8px]": width < 910 }
            )}>
                <div>{moment(props?.event?._instance?.range?.start).utc().format("h:mm A")}</div>
                <div>-</div>
                <div>{moment(props?.event?._instance?.range?.end).utc().format("h:mm A")}</div>
            </div>
        </div>
    )
}

export default CalendarEvent