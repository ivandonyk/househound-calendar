"use client"

import React, { useLayoutEffect, useState } from "react"
import classNames from "classnames"
import Image from "next/image"

import Select from "@/app/_components/Select"

import { IWeeklyHourSelectorProps } from "@/app/_types/components"

import blueCheckSvg from "@/public/blueCheck.svg"
import crossGraySvg from "@/public/crossGray.svg"
import plusBlueSvg from "@/public/plusBlue.svg"
import dotSvg from "@/public/dot.svg"

const WeeklyHourSelector: React.FC<IWeeklyHourSelectorProps> = ({
    day
}) => {
    const [checked, setIsChecked] = useState(false)
    const [gapTimes, setGapTimes] = useState<string[]>([])
    const [slots, setSlots] = useState<string[][]>([[]])

    useLayoutEffect(() => {
        const intervalsPerHour = 4
        const totalHours = 24
        const gapTimes = []

        for (let hour = 0; hour < totalHours; hour++) {
            for (let i = 0; i < intervalsPerHour; i++) {
                const time = day.clone().add(hour, 'hours').add(i * 15, 'minutes');
                gapTimes.push(time.format('h:mm A').toLowerCase());
            }
        }

        setGapTimes(gapTimes)
    }, [])

    const handleSlotSelect = (type: "from" | "to", slotIndex: number) => (value: string) => {
        const placeableIndex = type === "from" ? 0 : 1;
        const temp = [...slots]
        temp[slotIndex][placeableIndex] = value;
        setSlots(temp)
    }

    return (
        <div className="flex flex-row mt-[32px]">
            {checked ? 
                <Image 
                    className={classNames(
                        "cursor-pointer",
                        { "max-h-[44px]": checked },
                        { "max-h-[20px]": !checked },
                    )}
                    src={blueCheckSvg} 
                    alt="" 
                />
            : <div 
                className="w-[20px] h-[20px] cursor-pointer rounded-[2px] border-black border-[0.5px]" 
            />}
            <div className={classNames(
                "font-[500] w-[40px] text-[18px] leading-[20px] text-black-3 ml-[12px]",
                { "h-[44px] flex justify-center items-center": checked },
            )}>
                {day.format("ddd").toUpperCase()}
            </div>
            <div className="flex flex-col font-[400] text-[18px] leading-[20px] text-gray-7 ml-[35px]">
                {!checked ? 'Unavailable' : <>
                    {slots.map((slot, idx) => <div key={idx} className="flex flex-row gap-[7px]">
                        <Select 
                            options={gapTimes}
                            onChange={handleSlotSelect("from", idx)}
                            value={slots[idx][0]}
                        />
                        <Image src={dotSvg} alt="" />
                        <Select 
                            options={gapTimes}
                            onChange={handleSlotSelect("to", idx)}
                            value={slots[idx][1]}
                        />
                        <Image
                            className="ml-[29px] cursor-pointer"
                            onClick={() => setIsChecked(false)}
                            src={crossGraySvg}
                            alt=""
                        />
                    </div>)}
                </>}
            </div>
            <div className={classNames(
                "flex justify-center items-center relative ml-auto",
                { "max-h-[20px]": !checked },
                { "max-h-[44px]": checked }
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