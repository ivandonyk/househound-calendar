"use client"

import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import React, { useRef, useState } from "react"
import moment from "moment"

import { ICalendarProps } from '@/app/_types/components'
import CalendarEvent from './CalendarEvent'
import CalendarDayHeader from './CalendarDayHeader'
import CalendarSlotLabel from './CalendarSlotLabel'
import { useModalContext } from "../_context/ModalContext"
import { useCalendarContext } from "@/app/_context/CalendarContext"
import { Modals } from "@/app/_constants/constants"

import CalendarHeader from "./CalendarHeader"

const Calendar: React.FC<ICalendarProps> = ({ bookings }) => {
    const calendarRef = useRef<FullCalendar | null>(null)
    const { setActiveModal } = useModalContext()
    const { setSelectedSlots } = useCalendarContext()
    const [calendarDate, setCalendarDate] = useState({ start: "",  end: "" })

    const handleSelect = (startDate: string, endDate: string) => {
        setSelectedSlots({
            startTime: moment(startDate),
            endTime: moment(endDate)
        })
        setActiveModal(Modals.OptionsModal)
    }

    const onNext = () => {
        const api = calendarRef.current?.getApi()
        api?.next()
    }

    const onBack = () => {
        const api = calendarRef.current?.getApi()
        api?.prev()
    }

    return (
        <div className='w-full h-screen p-4'>
            <CalendarHeader onBack={onBack} onNext={onNext} calendarDate={calendarDate} />
            <FullCalendar
                ref={calendarRef}
                datesSet={date => setCalendarDate({ start: date.startStr, end: date.endStr })}
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