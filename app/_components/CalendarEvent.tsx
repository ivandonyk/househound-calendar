"use client"

import { EventContentArg } from "@fullcalendar/core/index.js"
import moment from "moment"
import React from "react"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"

import { Modals } from "@/app/_constants/constants"

const CalendarEvent: React.FC<EventContentArg> = (props) => {
    const { setActiveModal } = useModalContext()
    const { setSelectedSlots, setSelectedEvent, events } = useCalendarContext()

    const handleEventClick = () => {
        const targetEvent = events.find(event => event.id === props.event.id)
        if(!targetEvent) return;
        setSelectedSlots({
            startTime: moment(props?.event?._instance?.range?.start),
            endTime: moment(props?.event?._instance?.range?.end),
        })
        setSelectedEvent(targetEvent)
        setActiveModal(Modals.Booking)
    }

    return (
        <div 
            className="w-full min-h-max h-full bg-light-gray rounded-md cursor-pointer flex flex-col justify-center p-2"
            onClick={handleEventClick}
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