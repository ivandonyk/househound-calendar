"use client"

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import React, { useState, useLayoutEffect } from "react"
import { Moment } from "moment"


import CalendarHeader from './CalendarHeader'
import CalendarDay from "./CalendarDay"
import { useAvailabillities } from '@/app/_hooks/availability'

const CalendarCard = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>()
    const [gapTimes, setGapTimes] = useState<Moment[]>([])
    const { availabilities } = useAvailabillities("KNuJBnSn2gfAV6mYqGKWtNG0WFi1")

    useLayoutEffect(() => {
        if(!selectedDate) return;
        const intervalsPerHour = 4
        const totalHours = 24
        const gapTimes = []
        for (let hour = 0; hour < totalHours; hour++) {
            for (let i = 0; i < intervalsPerHour; i++) {
                const time = selectedDate.clone().add(hour, 'hours').add(i * 30, 'minutes');
                gapTimes.push(time)
            }
        }
        setGapTimes(gapTimes)
    }, [selectedDate])

    return (
        <div className="w-full bg-white-grad-3 px-[18px] gap-[12px] py-[23px] rounded-md flex flex-col">
            <div className="font-[500] text-[18px] leading-[20px] text-black-3">
                Schedule a tour window with Danny M.
            </div>
            <div className="font-[400] text-[16px] leading-[20px] text-black-3">
                Select Date and Time
            </div>
            <div className="w-full flex flex-row">
                <DateCalendar
                    classes={{
                        root: "!m-0 !w-[60%]",
                    }}
                    slots={{
                        day: props => <CalendarDay 
                            {...props} 
                            selectedDate={selectedDate} 
                            setSelectedDate={setSelectedDate} 
                            availabilities={availabilities}
                        />,
                        calendarHeader: CalendarHeader,
                    }}
                    dayOfWeekFormatter={(_, date) => `${date.format("ddd").toUpperCase()}`}
                />
                <div className='flex flex-col w-[40%] h-full overflow-hidden'>
                    <div className='w-full font-[400] text-[16px] pl-[39px] leading-[20px] text-black-3 mb-[22px]'>
                        {selectedDate?.format("dddd, MMMM DD")}
                    </div>
                    <div className='w-full flex flex-col gap-[11px] pl-[39px] h-[250px] overflow-auto'>
                        {gapTimes.map(time => <div 
                            key={time.toISOString()} 
                            className='px-[50px] cursor-pointer py-[12px] border-[1px] border-gray-11 rounded-md flex justify-center items-center'
                        >
                            {time.format("hh:mm a")}
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarCard
