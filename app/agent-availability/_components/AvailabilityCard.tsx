"use client"

import {
    useState,
    useLayoutEffect
} from "react"
import moment, { Moment } from "moment"
import Image from "next/image"

import blueCalendarSvg from "@/public/blueCalendar.svg"
import WeeklyHourSelector from "./WeeklyHourSelector"

const AvailabilityCard = () => {
    const [week, setWeek] = useState<Moment[] | null>(null)

    useLayoutEffect(() => {
        const weekDate = moment().startOf("week").set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0)
        const days = [...Array(7)].map((_, i) => weekDate.clone().add(i, "day"))
        setWeek(days)
    }, [])

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
            <div className="w-[40%]">
            </div>
        </div>
    )
}

export default AvailabilityCard

