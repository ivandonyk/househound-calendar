"use client"

import { PickersDay } from "@mui/x-date-pickers"
import classNames from "classnames"
import React from "react"

import { ICalendarDayProps } from "@/app/_types/components"

const CalendarDay: React.FC<ICalendarDayProps> = ({ 
    selectedDate, 
    setSelectedDate,
    availabilities,
    ...props 
}) => {
    const handleSelectDate = () => {
        setSelectedDate?.(props.day)
    }

    const isSelected = selectedDate?.format("dddd DD yyyy") === props.day.format("dddd DD yyyy")

    return (
        <div className="h-max w-full relative">
            <PickersDay 
                {...props}
                className={classNames(
                    "!text-[14px] !leading-[22px]",
                    { "!text-white !bg-transparent font-[500]": isSelected },
                    { "!font-[400] !text-[#FFFFFF60]": !isSelected }
                )}
                onClick={handleSelectDate}
            />
            <div className={classNames(
                "w-[8px] h-[8px] rounded-full bg-blue-6",
                { "hidden": !isSelected },
                { "absolute bottom-0 left-[calc(50%-4px)]": isSelected }
            )} />
        </div>
    )
}

export default CalendarDay
