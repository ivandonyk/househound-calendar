"use client"

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import React from "react"

import CalendarHeader from './CalendarHeader'
import CalendarDay from "./CalendarDay"

const CalendarCard = () => {
    return (
        <div className="w-full bg-white-grad-3 px-[18px] gap-[12px] py-[23px] rounded-md flex flex-col">
            <div className="font-[500] text-[18px] leading-[20px] text-black-3">
                Schedule a tour window with Danny M.
            </div>
            <div className="font-[400] text-[16px] leading-[20px] text-black-3">
                Select Date and Time
            </div>
            <div className="w-full">
                <DateCalendar
                    classes={{
                        root: "!m-0 !w-[60%]",
                    }}
                    slots={{
                        day: CalendarDay,
                        calendarHeader: CalendarHeader,
                    }}
                    dayOfWeekFormatter={(_, date) => `${date.format("ddd").toUpperCase()}`}
                />
            </div>
        </div>
    )
}

export default CalendarCard
