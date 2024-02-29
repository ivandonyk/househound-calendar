"use client"

import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import React from "react"

import { ICalendarProps } from '../_types/components'
import CalendarEvent from './CalendarEvent'
import CalendarDayHeader from './CalendarDayHeader'
import CalendarSlotLabel from './CalendarSlotLabel'

const Calendar: React.FC<ICalendarProps> = ({ bookings }) => {
    return (
        <div className='w-full h-screen p-4'>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView='timeGridWeek'
                headerToolbar={false}
                allDaySlot={false}
                slotDuration={{ hours: 1 }}
                dayHeaderClassNames={["!p-0 !m-0"]}
                slotLabelClassNames={['text-[18px] font-[400] text-white p-2']}
                eventClassNames={["bg-transparent border-none"]}
                events={bookings?.map(booking => ({ title: booking.title, start: new Date(booking.date) })) || []}
                slotLabelContent={props => <CalendarSlotLabel key={props.date.toLocaleString()} {...props} />}
                eventContent={(props) => <CalendarEvent key={props.event.start?.toLocaleString()} {...props} />}
                dayHeaderContent={props => <CalendarDayHeader key={props.date.toISOString()} {...props} />}
                height="100%"
            />
        </div>
    )
}

export default Calendar