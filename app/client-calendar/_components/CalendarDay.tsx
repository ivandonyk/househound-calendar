"use client"

import React, { useEffect, useState } from "react"
import { PickersDay } from "@mui/x-date-pickers"
import classNames from "classnames"
import moment from "moment"

import { useCalendarContext } from "@/app/_context/CalendarContext"

import { ICalendarDayProps } from "@/app/_types/components"

const CalendarDay: React.FC<ICalendarDayProps> = ({ selectedDate, setSelectedDate, ...props }) => {
    const { availabilities } = useCalendarContext()
    const [available, setAvailable] = useState(false)

    useEffect(() => {
        if(availabilities?.length) {
            const todaysAvailabilities = availabilities.filter(
                availability => moment(availability.from).format("dddd DD yyyy") === props.day.format("dddd DD yyyy")
            )
            if(todaysAvailabilities?.length) setAvailable(true)
        }
    }, [availabilities])

    const handleSelectDate = () => {
        if(available) setSelectedDate(props.day)
    }

    return (
        <div className="h-max">
            <PickersDay 
                {...props}
                className={classNames(
                    "!font-[400] !text-[17px] !leading-[20px] !mx-[30px] !mb-[4px]",
                    { "!bg-white !text-blue-4": available },
                    { "!text-gray-10 pointer-events-none": !available },
                    { "!font-[600]": moment().format("dddd DD yyyy") === props.day.format("dddd DD yyyy") },
                    { "!bg-blue-4 !text-white": selectedDate?.format("dddd DD yyyy") === props.day.format("dddd DD yyyy") }
                )}
                onClick={handleSelectDate}
            />
        </div>
    )
}

export default CalendarDay
