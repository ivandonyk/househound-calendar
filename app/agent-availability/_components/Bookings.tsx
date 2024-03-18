"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import moment from "moment"

import { useDeleteBooking } from "@/app/_hooks/booking"

import { useCalendarContext } from "@/app/_context/CalendarContext"

import { IBookingsProps, IDailyParsedEvent } from "@/app/_types/components"
import { IBooking } from "@/app/_types/entities"

import whiteDeleteSvg from "@/public/whiteDelete.svg"

const Bookings: React.FC<IBookingsProps> = ({ week }) => {
    const { events } = useCalendarContext()
    const [weeklyEvents, setWeeklyEvents] = useState<IBooking[]>([])
    const [dailyParsedEvents, setDailyParsedEvents] = useState<IDailyParsedEvent[]>([])
    const { deleteBooking, isDeletingBooking } = useDeleteBooking()

    useEffect(() => {
        if(events.length) {
            const filtered = events.filter(event => 
                moment(event.startTime).isSameOrAfter(week[0])
                && moment(event.startTime).isSameOrBefore(week[6])
            )
            setWeeklyEvents(filtered)
        }
    }, [events, week])

    useEffect(() => {
        if(weeklyEvents.length) {
            const temp: IDailyParsedEvent[] = []
            week.forEach(day => {
                const dayEnd = day.clone().set('hour', 23).set("minute", 59).set("second", 59)
                const dailyEvents = weeklyEvents.filter(event => 
                    moment(event.startTime).isSameOrAfter(day)
                    && moment(event.startTime).isSameOrBefore(dayEnd)
                )
                if(dailyEvents.length) temp.push({
                    date: day,
                    events: dailyEvents
                })
            })
            setDailyParsedEvents(temp)
        }
    }, [weeklyEvents])

    const handleDelete = (id: string) => {
        if(isDeletingBooking) return;
        deleteBooking(id)
    }

    return (
        <div className="flex flex-col gap-[21px] w-full overflow-auto h-full pb-12">
            {dailyParsedEvents.map(({ date, events }, idx) => <div key={idx} className="flex flex-col gap-[8px]">
                <div className="font-[400] text-[16px] leading-[22px] text-gray-9">
                    {date.format("dddd DD")}
                </div>
                {events
                    .sort((a, b) => {
                        const momentA = moment(a.startTime)
                        const momentB = moment(b.startTime)
                        return momentA.valueOf() - momentB.valueOf()
                    })
                    .map(event => <div className="w-full rounded-md bg-blue-2 text-white flex flex-row px-[15px] py-[10px]">
                    <div className="font-[600] w-[80px] text-[14px] leading-[22px]">
                        {moment(event.startTime).format("hh:mm a")}
                    </div>
                    {/* <div className="font-[400] ml-[15px] text-[14px] leading-[22px]">
                        {event.title}
                    </div> */}
                    <Image 
                        className="ml-auto cursor-pointer"
                        src={whiteDeleteSvg}
                        alt=""
                        onClick={() => handleDelete(event.id)}
                    />
                </div>)}
            </div>)}
        </div>
    )
}

export default Bookings
