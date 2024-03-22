"use client"

import React, { useLayoutEffect, useState } from "react"
import moment, { Moment } from "moment"
import classNames from "classnames"
import Image from "next/image"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useUserContext } from "@/app/_context/UserContext"

import {
    useAddAvailability,
    useDeleteAvailability,
    useUpdateAvailability
} from "@/app/_hooks/availability"

import Select from "@/app/_components/Select"

import { IWeeklyHourSelectorProps } from "@/app/_types/components"

import blueCheckSvg from "@/public/blueCheck.svg"
import crossGraySvg from "@/public/crossGray.svg"
import plusBlueSvg from "@/public/plusBlue.svg"
import dotSvg from "@/public/dot.svg"
import { getMoment } from "@/app/_utils/date"

const WeeklyHourSelector: React.FC<IWeeklyHourSelectorProps> = ({
    day
}) => {
    const [checked, setIsChecked] = useState(false)
    const [gapTimes, setGapTimes] = useState<Moment[]>([])
    const { availabilities } = useCalendarContext()
    const { user } = useUserContext()
    const [to, setTo] = useState<Moment>()
    const [from, setFrom] = useState<Moment>()
    const { addAvailability } = useAddAvailability()
    const { updateAvailability } = useUpdateAvailability()
    const { deleteAvailability } = useDeleteAvailability()

    useLayoutEffect(() => {
        const intervalsPerHour = 2
        const totalHours = 24
        const gapTimes = []

        for (let hour = 0; hour < totalHours; hour++) {
            for (let i = 0; i < intervalsPerHour; i++) {
                const time = day.clone().add(hour, 'hours').add(i * 30, 'minutes');
                gapTimes.push(time)
            }
        }

        const today = moment()

        setGapTimes(gapTimes)
    }, [])

    const handleUpdateSlot = (type: "from" | "to", id: string) => (date: Moment) => {
        if(type === "to") updateAvailability(id, date)
        else updateAvailability(id, undefined, date)
    }

    const handleAddSlot = async() => {
        if(!to || !from || !user?.uid) return;
        await addAvailability(user.uid, to, from)
        setIsChecked(false)
        setTo(undefined)
        setFrom(undefined)
    }

    const handleDeleteSlot = (id: string) => deleteAvailability(id)

    const filteredAvailabilities = availabilities
        .filter(({ to, from }) => getMoment(to).day() === day.day())
        .sort((a, b) => {
        const momentA = getMoment(a.from);
        const momentB = getMoment(b.from);

        // Compare using `.diff()` or `.valueOf()`
        return momentA.valueOf() - momentB.valueOf(); // ascending order
    })

    const expanded = checked || filteredAvailabilities.length;

    return (
        <div className="flex flex-row mt-[32px]">
            {expanded ?
                <Image
                    className={classNames(
                        "cursor-pointer",
                        { "max-h-[30px] md:max-h-[44px]": expanded },
                        { "max-h-[18px] md:max-h-[20px]": !expanded },
                    )}
                    src={blueCheckSvg}
                    alt=""
                />
            : <div
                className="md:w-[20px] w-[18px] md:h-[20px] h-[18px] cursor-pointer rounded-[2px] border-black border-[0.5px]"
            />}
            <div className={classNames(
                "font-[500] w-[25px] md:w-[40px] text-[14px] md:text-[18px] leading-[20px] text-black-3 ml-[12px]",
                { "h-[30px] md:h-[44px] flex justify-center items-center": expanded },
            )}>
                {day.format("ddd").toUpperCase()}
            </div>
            <div className="flex flex-col gap-[12px] font-[400] text-[14px] md:text-[18px] leading-[20px] text-gray-7 ml-[20px] md:ml-[35px]">
                {!filteredAvailabilities?.length && !checked ? 'Unavailable' : <>
                    {filteredAvailabilities
                        .map((slot, idx) => <div key={idx} className="flex flex-row gap-[7px]">
                        <Select
                            options={gapTimes}
                            onChange={handleUpdateSlot("from", slot.id)}
                            value={getMoment(slot.from).format("hh:mm a").toLowerCase()}
                        />
                        <Image src={dotSvg} alt="" />
                        <Select
                            options={gapTimes.slice(gapTimes.findIndex(time => time.format("hh:mm a") === getMoment(slot.from).format("hh:mm a"))+1)}
                            onChange={handleUpdateSlot("to", slot.id)}
                            value={getMoment(slot.to).format("hh:mm a").toLowerCase()}
                        />
                        <Image
                            className="md:ml-[29px] cursor-pointer"
                            onClick={() => handleDeleteSlot(slot.id)}
                            src={crossGraySvg}
                            alt=""
                        />
                    </div>)}
                </>}
                {checked ? <div className="flex flex-row gap-[7px]">
                    <Select
                        options={gapTimes}
                        onChange={date => setFrom(date)}
                        value={from ? moment(from).format("hh:mm a").toLowerCase() : ""}
                    />
                    <Image src={dotSvg} alt="" />
                    <Select
                        options={from ? gapTimes.slice(gapTimes.findIndex(time => time.format("hh:mm a") === from.format("hh:mm a"))+1) : gapTimes}
                        onChange={date => setTo(date)}
                        value={to ? moment(to).format("hh:mm a").toLowerCase() : ""}
                    />
                    <Image
                        className="md:ml-[29px] cursor-pointer"
                        onClick={() => {
                            setIsChecked(false)
                            setTo(undefined)
                            setFrom(undefined)
                        }}
                        src={crossGraySvg}
                        alt=""
                    />
                    <button onClick={handleAddSlot} className="px-2 md:p-2 rounded-md bg-primary-blue text-white md:ml-4">Save</button>
                </div>: <></>}
            </div>
            <div className={classNames(
                "flex justify-center items-center relative mr-6 ml-auto",
                { "max-h-[30px] md:max-h-[44px]": expanded },
                { "max-h-[18px] md:max-h-[20px]": !expanded },
            )}>
                <div className="w-[18px] h-[18px] bg-white absolute" />
                <Image
                    className="w-[20px] h-[20px] ml-auto cursor-pointer z-10"
                    src={plusBlueSvg}
                    alt=""
                    onClick={() => setIsChecked(true)}
                />
            </div>
        </div>
    )
}

export default WeeklyHourSelector