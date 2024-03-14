"use client"

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import React, { useState, useLayoutEffect } from "react"
import classNames from 'classnames'
import { Moment } from "moment"

import { useModalContext } from '@/app/_context/ModalContext'

import { useAvailabillities } from '@/app/_hooks/availability'
import { useCreateBooking } from '@/app/_hooks/booking'

import { Modals } from '@/app/_constants/constants'

import CalendarHeader from './CalendarHeader'
import CalendarDay from "./CalendarDay"

import "../client-calendar.css"

const CalendarCard = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>()
    const [gapTimes, setGapTimes] = useState<Moment[]>([])
    const agentId = "KNuJBnSn2gfAV6mYqGKWtNG0WFi1"
    const { availabilities } = useAvailabillities(agentId)
    const [selectedSlot, setSelectedSlot] = useState<Moment>()
    const { addBooking, isCreatingBooking } = useCreateBooking()
    const { setActiveModal } = useModalContext()

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

    const handleCreate = async() => {
        if(isCreatingBooking || !selectedSlot) return
        await addBooking({
            endTime: "",
            notes: "",
            startTime: selectedSlot.toISOString(),
            title: "",
            uuids: [agentId]
        })
        setActiveModal(Modals.AppointmentCreated)
    }

    return (
        <div className="w-full bg-white-grad-3 px-[18px] gap-[12px] py-[23px] rounded-md flex flex-col">
            <div className="hidden md:block font-[500] text-[18px] leading-[20px] text-black-3">
                Schedule a tour window with Danny M.
            </div>
            <div className="font-[400] hidden md:block text-[16px] leading-[20px] text-black-3">
                Select Date and Time
            </div>
            <div className='md:hidden font-[500] text-[16px] leading-[22px] text-black-3'>
                Select a day
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <div className='w-[60%] md:block hidden'>
                    <DateCalendar
                        classes={{
                            root: "!m-0 !w-[100%]",
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
                </div>
                <div className='w-[100%] md:hidden mb-[45px]'>
                    <DateCalendar
                        classes={{
                            root: "!m-0 !w-[100%]",
                            viewTransitionContainer: "!bg-gray-12 !rounded-lg !px-[10px]"
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
                        dayOfWeekFormatter={(_, date) => `${date.format("ddd")[0].toUpperCase()}`}
                    />
                </div>
                <div className='md:hidden font-[500] text-[14px] leading-[22px] text-black-3'>
                    Select a time
                </div>
                <div className='flex flex-col w-[100%] md:w-[40%] h-full overflow-hidden'>
                    <div className={classNames(
                        'w-full font-[400] text-[13px] md:text-[16px] md:pl-[39px] leading-[20px] text-black-3',
                        { 'mb-[22px]': !selectedSlot },
                        { 'mb-[10px]': selectedSlot },
                    )}>
                        {selectedDate?.format("dddd, MMMM DD")}
                    </div>
                    {selectedSlot ? <div className='flex md:pl-[39px] flex-row gap-2 w-full mb-[10px]'>
                        <div className='w-full text-white text-center rounded-md px-[7px] py-[12px] font-[500] text-[15px] leading-[20px] bg-gray-13'>
                            {selectedSlot.format("hh:mm a")}
                        </div>
                        <div 
                            className='w-full text-center text-white rounded-md px-[7px] py-[12px] font-[500] text-[15px] leading-[20px] bg-blue-4'
                            onClick={handleCreate}
                        >
                            Create
                        </div>
                    </div> : <></>}
                    <div className='w-full flex flex-col gap-[11px] md:pl-[39px] h-[250px] overflow-auto'>
                        {gapTimes.map(time => <div 
                            key={time.toISOString()}
                            onClick={() => setSelectedSlot(time)}
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
