"use client"

import { SlotLabelContentArg } from "@fullcalendar/core/index.js"
import React from "react"
import moment from "moment"

const CalendarSlotLabel: React.FC<SlotLabelContentArg> = (props) => {
    return (
        <div className="text-[18px] font-[400] p-4">
            {moment(props.date).format("h A")}
        </div>
    )
}

export default CalendarSlotLabel