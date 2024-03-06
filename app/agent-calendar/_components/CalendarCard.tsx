"use client"

import Image from "next/image"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"

import calendarBlueSvg from "@/public/blueCalendar.svg"

import CalendarDayHeader from "./CalendarDayHeader"
import CalendarSlotLabel from "./CalendarSlotLabel"

const CalendarCard = () => {
    return (
        <div className="agent-calendar w-full h-[450px] flex flex-row py-[24px] px-[20px]">
            <div className="w-[60%] flex flex-col max-h-max gap-[18px] overflow-hidden">
                <div className="flex flex-row w-full items-center gap-[10px]">
                    <Image className="w-[35px] h-[35px]" src={calendarBlueSvg} alt="" />
                    <div className="font-[500] text-[20px] leading-[20px] text-black-3">
                        Select your availability to meet with clients
                    </div>
                </div>
                <div>
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView='timeGridWeek'
                        allDaySlot={false}
                        headerToolbar={false}
                        selectOverlap={false}
                        eventOverlap={false}
                        height="350px"
                        firstDay={1}
                        slotDuration={{ hours: 1 }}
                        dayHeaderClassNames={["!p-0 !m-0"]}
                        slotLabelClassNames={['text-[18px] font-[400] p-[9px]']}
                        slotLabelContent={props => <CalendarSlotLabel key={props.date.toLocaleString()} {...props} />}
                        dayHeaderContent={props => <CalendarDayHeader key={props.date.toISOString()} {...props} />}
                    />
                </div>
            </div>
            <div className="w-[40%]">
                bookings
            </div>
        </div>
    )
}

export default CalendarCard
