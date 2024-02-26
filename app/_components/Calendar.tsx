"use client"

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import React from "react"

import { ICalendarProps } from '../_types/components'

const Calendar: React.FC<ICalendarProps> = ({ bookings }) => {
    return (
        <div className='w-[35%] h-[600px]'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={bookings?.map(booking => ({ title: booking.title, start: new Date(booking.date) })) || []}
                height="100%"
                // eventContent={renderEventContent}
            />
        </div>
    )
}

export default Calendar