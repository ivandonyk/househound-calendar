"use client"

import React, { useEffect, useState } from "react"
import { PickersDay } from "@mui/x-date-pickers"
import classNames from "classnames"
import moment from "moment"

import { ICalendarDayProps } from "@/app/_types/components"

const CalendarDay: React.FC<ICalendarDayProps> = ({ 
    selectedDate, 
    setSelectedDate,
    availabilities,
    ...props 
}) => {
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
        if(available) setSelectedDate?.(props.day)
    }

    const isPast = props.day.isBefore(moment().clone().set("hour",0).set("minute", 0).set("second", 0).set("millisecond", 0))

    return (
        <div className="h-max w-full">
            <PickersDay 
                {...props}
                className={classNames(
                    "!font-[400] !text-[14px] md:!text-[17px] !leading-[22px] md:!leading-[20px]",
                    { "!bg-white !text-blue-4": available && !isPast && !(selectedDate?.format("dddd DD yyyy") === props.day.format("dddd DD yyyy")) },
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
