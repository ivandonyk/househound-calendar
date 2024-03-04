"use client"

import React, { 
    createContext, 
    useContext, 
    useState
} from "react"

import { ICalendarContext, ICalendarState } from "@/app/_types/context"

const CalendarContext = createContext<ICalendarContext>({
    selectedSlots: {
        endTime: null,
        startTime: null,
    },
    setSelectedSlots: () => {},
})
export const useCalendarContext = () => useContext(CalendarContext)

const CalendarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSlots, setSelectedSlots] = useState<ICalendarState | null>(null)

    return (
        <CalendarContext.Provider value={{ 
            selectedSlots,
            setSelectedSlots,
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarProvider
