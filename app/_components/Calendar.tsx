"use client"

import interactionPlugin, { 
    EventResizeDoneArg 
} from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import React, { 
    useEffect, 
    useRef, 
    useState 
} from "react"
import moment from "moment"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"
import { useUserContext } from "@/app/_context/UserContext"

import { useUpdateBooking } from "@/app/_hooks/booking"

import { Modals } from "@/app/_constants/constants"

import { ICalendarProps } from '@/app/_types/components'

import CalendarDayHeader from './CalendarDayHeader'
import CalendarSlotLabel from './CalendarSlotLabel'
import CalendarHeader from "./CalendarHeader"
import CalendarEvent from './CalendarEvent'

const Calendar: React.FC<ICalendarProps> = () => {
    const calendarRef = useRef<FullCalendar | null>(null)
    const { setActiveModal } = useModalContext()
    const { setSelectedSlots, events, fetchBookings } = useCalendarContext()
    const { user } = useUserContext()
    const [calendarDate, setCalendarDate] = useState({ start: "",  end: "" })
    const { updateBooking } = useUpdateBooking()

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

    const handleResizeEvent = async(eventArg: EventResizeDoneArg) => {
        await updateBooking({
            id: eventArg.event.id,
            endTime: moment(eventArg.event.end).toISOString()
        })
        fetchBookings()
    }

    useEffect(() => {
        if(!events?.length || !user?.uid) return;
        const api = calendarRef.current?.getApi()
        api?.removeAllEventSources()
        api?.addEventSource(events.map(({ endTime, startTime, title, id }) => ({ id, start: startTime, end: endTime, title })))
    }, [events, user])

    return (
        <div className='w-full h-full overflow-auto p-4'>
            <CalendarHeader onBack={onBack} onNext={onNext} calendarDate={calendarDate} />
            <FullCalendar
                ref={calendarRef}
                datesSet={date => setCalendarDate({ start: date.startStr, end: date.endStr })}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView='timeGridWeek'
                editable
                eventOverlap={false}
                eventResize={handleResizeEvent}
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
                slotLabelContent={props => <CalendarSlotLabel key={props.date.toLocaleString()} {...props} />}
                eventContent={(props) => <CalendarEvent key={props.event.start?.toLocaleString()} {...props} />}
                dayHeaderContent={props => <CalendarDayHeader key={props.date.toISOString()} {...props} />}
                height="100%"
            />
        </div>
    )
}

export default Calendar