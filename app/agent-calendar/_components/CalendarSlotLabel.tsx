"use client"

import { SlotLabelContentArg } from "@fullcalendar/core/index.js"
import React from "react"
import moment from "moment"

const CalendarSlotLabel: React.FC<SlotLabelContentArg> = (props) => {
    return (
        <div className="text-[16px] p-[9px] pl-0 leading-[22px] font-[400] h-full text-left">
            {moment(props.date).format("h:mm")}
        </div>
    )
}

export default CalendarSlotLabel