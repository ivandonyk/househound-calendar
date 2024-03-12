"use client"

import { PickersDayProps, PickersDay } from "@mui/x-date-pickers"
import React, { useEffect, useState } from "react"
import moment, { Moment } from "moment"
import classNames from "classnames"

import { useCalendarContext } from "@/app/_context/CalendarContext"

const CalendarDay: React.FC<PickersDayProps<Moment>> = (props) => {
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

    return (
        <div className="h-max">
            <PickersDay 
                {...props}
                className={classNames(
                    "!font-[400] !text-[17px] !leading-[20px] !mx-[30px] !mb-[4px]",
                    { "!bg-white !text-blue-4": available },
                    { "!text-gray-10 pointer-events-none": !available },
                    { "!font-[600]": moment().format("dddd DD yyyy") === props.day.format("dddd DD yyyy") }
                )}
            />
        </div>
    )
}

export default CalendarDay
