"use client"

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import React, { useState, useLayoutEffect, useEffect } from "react"
import moment, { Moment } from "moment"
import classNames from 'classnames'

import { useModalContext } from '@/app/_context/ModalContext'

import { useAvailabillities } from '@/app/_hooks/availability'
import { useBookings, useCreateBooking } from '@/app/_hooks/booking'

import { formatMoment, getMoment } from '@/app/_utils/date'

import { Modals } from '@/app/_constants/constants'

import CalendarHeader from './CalendarHeader'
import CalendarDay from "./CalendarDay"

import "../client-calendar.css"

const CalendarCard = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>()
    const [gapTimes, setGapTimes] = useState<Moment[]>([])
    const agentId = "KNuJBnSn2gfAV6mYqGKWtNG0WFi1"
    const { availabilities } = useAvailabillities(agentId)
    const { bookings, fetchBookings } = useBookings(agentId)
    const [selectedSlot, setSelectedSlot] = useState<Moment>()
    const { addBooking, isCreatingBooking } = useCreateBooking()
    const { setActiveModal } = useModalContext()

    const generateIntervals = () => {
        if(!selectedDate || !bookings || !availabilities?.length) return;
        const todayBookings = bookings.filter(booking => {
            const bookingTime = getMoment(booking.startTime).format("DD dddd MMMM yyyy")
            const selectedDateTime = selectedDate.format("DD dddd MMMM yyyy")
            return bookingTime === selectedDateTime
        })
        const todayBookedSlots = todayBookings.map(booking => getMoment(booking.startTime).format("hh:mm a"))
        const intervalsPerHour = 2
        const totalHours = 24
        const gapTimes: Moment[] = []
        const time = selectedDate
            .clone()
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0)
        for (let hour = 0; hour < totalHours; hour++) {
            for (let i = 0; i < intervalsPerHour; i++) {
                const calcTime = time
                    .clone()
                    .add(hour, 'hours')
                    .add(i * 30, 'minutes')
                gapTimes.push(calcTime)
            }
        }
        const selectedDatesAvailabilities = availabilities
            .filter(a => getMoment(a.from).format("DD dddd MMMM yyyy") === selectedDate.format("DD dddd MMMM yyyy"))
        const times = selectedDatesAvailabilities
            .map(availability => [getMoment(availability.from), getMoment(availability.to)])
        let finalGaps: Moment[]  = [];
        times.forEach(time => {
            const startIndex = gapTimes.findIndex(gap => gap.format("hh:mm a") === time[0].format("hh:mm a"))
            const endIndex = gapTimes.findIndex(gap => gap.format("hh:mm a") === time[1].format("hh:mm a"))
            let tempGaps = [...gapTimes]
            if(startIndex !== -1) tempGaps = tempGaps.slice(startIndex)
            if(endIndex !== -1) tempGaps = tempGaps.slice(0, endIndex - (startIndex !== -1 ? startIndex : 0))
            finalGaps = [...finalGaps, ...tempGaps]
        })
        finalGaps.sort((a, b) => {
            const momentA = moment(a);
            const momentB = moment(b);

            // Compare using `.diff()` or `.valueOf()`
            return momentA.valueOf() - momentB.valueOf(); // ascending order
        })
        setGapTimes(finalGaps.filter(time => !todayBookedSlots.includes(time.format("hh:mm a"))))
    }

    useEffect(() => {
        setSelectedSlot(undefined)
    }, [selectedDate])

    useLayoutEffect(() => {
        generateIntervals()
    }, [selectedDate, availabilities, bookings])

    const handleCreate = async() => {
        if(isCreatingBooking || !selectedSlot) return
        await addBooking({
            endTime: "",
            notes: "",
            startTime: formatMoment(selectedSlot),
            title: "",
            uuids: [agentId]
        })
        await fetchBookings()
        setSelectedSlot(undefined)
        setActiveModal(Modals.AppointmentCreated)
    }

    return (
        <div className="w-full bg-white-grad-3 px-[18px] gap-0 md:gap-[12px] py-[23px] rounded-md flex flex-col">
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
                <div className='w-[100%] md:hidden mb-[20px]'>
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
                        { 'mb-[20px]': selectedSlot },
                    )}>
                        {selectedDate?.format("dddd, MMMM DD")}
                    </div>
                    {selectedSlot ? <div className='flex md:pl-[39px] flex-row gap-2 w-full mb-[9px]'>
                        <div className='w-full h-[55px] text-white grid place-items-center rounded-md px-[7px] py-[12px] font-[500] text-[15px] leading-[20px] bg-gray-13'>
                            {selectedSlot.format("hh:mm a")}
                        </div>
                        <div
                            className='w-full cursor-pointer h-[55px] grid place-items-center text-white rounded-md px-[7px] py-[12px] font-[500] text-[15px] leading-[20px] bg-blue-4'
                            onClick={handleCreate}
                        >
                            Create
                        </div>
                    </div> : <></>}
                    <div className='w-full flex flex-col gap-[11px] md:pl-[39px] h-[250px] white-scrollbar overflow-auto'>
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
