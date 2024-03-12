"use client"

import {
    useState,
    useLayoutEffect
} from "react"
import moment, { Moment } from "moment"
import Image from "next/image"

import WeeklyHourSelector from "./WeeklyHourSelector"

import rightChevronGraySvg from "@/public/rightChevronGray.svg"
import leftChevronGraySvg from "@/public/leftChevronGray.svg"
import blueCalendarSvg from "@/public/blueCalendar.svg"
import Bookings from "./Bookings"

const AvailabilityCard = () => {
    const [week, setWeek] = useState<Moment[] | null>(null)
    const [appointmentWeek, setAppointmentWeek] = useState<Moment[] | null>(null)

    useLayoutEffect(() => {
        const weekDate = moment().startOf("week").set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0)
        const days = [...Array(7)].map((_, i) => weekDate.clone().add(i, "day"))
        setWeek(days)
        setAppointmentWeek(days)
    }, [])

    const getFormattedDateString = () => {
        if(!appointmentWeek) return ""
        const isSameMonthWeek = appointmentWeek.every(day => day.month() === appointmentWeek[0].month())
        if(isSameMonthWeek)
            return `${appointmentWeek?.[0].format("DD")}-${appointmentWeek?.[6].format("DD")} ${appointmentWeek[0].format("MMMM, yyyy")}`
        const differentIndex = appointmentWeek.findIndex(day => day.month() !== appointmentWeek[0].month())
        return `${appointmentWeek?.[0].format("DD MMMM")}-${appointmentWeek?.[differentIndex]?.format("DD MMMM")} ${moment().format("yyyy")}`
    }

    const handleWeekBack = () => {
        if(!appointmentWeek) return
        const lastWeekDay = appointmentWeek[0].clone().add(-1, "day")
        const weekDate = lastWeekDay.startOf("week").set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0)
        const days = [...Array(7)].map((_, i) => weekDate.clone().add(i, "day"))
        setAppointmentWeek(days)
    }

    const handleWeekNext = () => {
        if(!appointmentWeek) return
        const nextWeekDay = appointmentWeek[6].clone().add(1, "day")
        const weekDate = nextWeekDay.startOf("week").set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0)
        const days = [...Array(7)].map((_, i) => weekDate.clone().add(i, "day"))
        setAppointmentWeek(days)
    }

    return (
        <div className="w-full h-[372px] bg-white-grad-2 rounded-[10px] flex flex-row px-[18px] py-[24px]">
            <div className="w-[60%] flex flex-col">
                <div className="flex flex-row gap-[10px] items-center mb-[7px]">
                    <Image
                        className="w-[35px] h-[35px]"
                        src={blueCalendarSvg} 
                        alt="" 
                    />
                    <div className="font-[500] text-[20px] leading-[20px]">
                        Weekly hours
                    </div>
                </div>
                <div className="overflow-auto">
                    {week?.map(day => <WeeklyHourSelector day={day} />)}
                </div>
            </div>
            <div className="w-[32%] ml-[8%] overflow-hidden">
                <div className="flex flex-row gap-[10px] items-center mb-[7px]">
                    <div className="font-[500] text-[16px] leading-[22px] pt-3">
                        Next appointment
                    </div>
                    <div className="flex flex-row gap-2 pt-3 ml-auto">
                        <Image 
                            className="cursor-pointer"
                            src={leftChevronGraySvg}
                            alt=""
                            onClick={handleWeekBack}
                        />
                        <div className="font-[400] text-[14px] leading-[22px]">
                            {getFormattedDateString()}
                        </div>
                        <Image
                            className="cursor-pointer"
                            src={rightChevronGraySvg}
                            alt=""
                            onClick={handleWeekNext}
                        />
                    </div>
                </div>
                {appointmentWeek ? <Bookings week={appointmentWeek} /> : <></>}
            </div>
        </div>
    )
}

export default AvailabilityCard

