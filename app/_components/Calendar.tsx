"use client"

import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import moment from "moment"
import React from "react"

import { ICalendarProps } from '../_types/components'
import CalendarEvent from './CalendarEvent'
import CalendarDayHeader from './CalendarDayHeader'
import CalendarSlotLabel from './CalendarSlotLabel'
import { useModalContext } from "../_context/ModalContext"
import { useCalendarContext } from "../_context/CalendarContext"
import { Modals } from "../_constants/constants"

const Calendar: React.FC<ICalendarProps> = ({ bookings }) => {
    const { setActiveModal } = useModalContext()
    const { setSelectedSlots } = useCalendarContext()

    const handleSelect = (startDate: string, endDate: string) => {
        setSelectedSlots({
            startTime: moment(startDate),
            endTime: moment(endDate)
        })
        setActiveModal(Modals.OptionsModal)
    }

    return (
        <div className='w-full h-screen p-4'>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView='timeGridWeek'
                headerToolbar={false}
                selectOverlap={false}
                allDaySlot={false}
                selectLongPressDelay={1}
                selectable={true}
                select={(info) => handleSelect(info.startStr, info.endStr)}
                slotDuration={{ hours: 1 }}
                dayHeaderClassNames={["!p-0 !m-0"]}
                slotLabelClassNames={['text-[18px] font-[400] text-white p-2 !border-none']}
                eventClassNames={["bg-transparent border-none !shadow-none"]}
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