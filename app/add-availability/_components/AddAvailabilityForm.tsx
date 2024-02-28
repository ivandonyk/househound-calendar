"use client"

import { useLayoutEffect, useState } from "react"
import moment, { Moment } from "moment"

import AvailabilityDateSelect from "./AvailabilityDateSelect"

const AddAvailabilityForm = () => {
    const [week, setWeek] = useState<Moment[] | null>(null)

    useLayoutEffect(() => {
        const weekDate = moment().startOf("week").set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0)
        const days = [...Array(7)].map((_, i) => weekDate.clone().add(i, "day"))
        setWeek(days)
    }, [])

    return (
        <div className="h-full-with-nav w-full flex flex-col gap-4 justify-center items-center">
            {week?.map(date => <AvailabilityDateSelect date={date} key={date.toString()} />)}
        </div>
    )
}

export default AddAvailabilityForm