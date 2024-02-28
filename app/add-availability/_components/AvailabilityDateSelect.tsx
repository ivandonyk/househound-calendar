"use client"

import moment, { Moment } from "moment"
import React, { useState } from "react"

import { IAvailabilityDateSelectProps } from "@/app/_types/components"

import { useAddAvailability } from "@/app/_hooks/availability"

import { useUserContext } from "@/app/_context/UserContext"

const AvailabilityDateSelect: React.FC<IAvailabilityDateSelectProps> = ({ date }) => {
    const [to, setTo] = useState<Moment | null>(null)
    const [from, setFrom] = useState<Moment | null>(null)
    const [error, setError] = useState("")
    const { addAvailability, isLoading } = useAddAvailability()
    const { user } = useUserContext()

    const validate = () => {
        if(!to || !from) {
            setError("please select valid range")
            return false
        }
        else if (to.isBefore(from)) {
            setError("'To' cannot be before 'From'")
            return false
        }
        setError("")
        return true
    }

    const handleAdd = () => {
        const isValid = validate()
        if(!isValid) return;
        if(user?.uid && to && from) 
            addAvailability(user.uid, to, from)
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-[600px]">
            <div 
                key={date.toString()}
                className="w-full flex flex-row gap-4"
            >
                <div className="w-[20%]">{date.format("dddd")}</div>
                <div className="w-[40%] flex flex-col gap-2">
                    <div>From</div>
                    <input 
                        value={from?.format("YYYY-MM-DDTHH:mm")}
                        type="datetime-local" 
                        min={date.clone().format("YYYY-MM-DDTHH:mm")}
                        max={date.clone().set("hours", 23).set("minutes", 59).set("seconds", 59).format("YYYY-MM-DDTHH:mm")}
                        onChange={e => setFrom(moment(e.target.value))}
                    />
                </div>
                <div className="w-[40%] flex flex-col gap-2">
                    <div>To</div>
                    <input 
                        value={to?.format("YYYY-MM-DDTHH:mm")}
                        type="datetime-local" 
                        min={date.clone().format("YYYY-MM-DDTHH:mm")}
                        max={date.clone().set("hours", 23).set("minutes", 59).set("seconds", 59).format("YYYY-MM-DDTHH:mm")}
                        onChange={e => setTo(moment(e.target.value))}
                    />
                </div>
                <button
                    disabled={isLoading}
                    className="p-2 border-2 border-black rounded-md"
                    onClick={handleAdd}
                >
                    {isLoading ? 'adding ...' : `Add`}
                </button>
            </div>
            {error ? <div className="text-red-500 text-sm">{error}</div> : <></>}
        </div>
    )
}

export default AvailabilityDateSelect
