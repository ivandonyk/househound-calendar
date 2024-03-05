"use client"

import React, { 
    createContext, 
    useCallback, 
    useContext, 
    useEffect, 
    useState
} from "react"
import { 
    collection, 
    getDocs, 
    query, 
    where 
} from "firebase/firestore"

import { 
    ICalendarContext, 
    ICalendarState,
} from "@/app/_types/context"

import { IBooking } from "@/app/_types/entities"

import { db } from "@/app/_lib/firebase/firebase"

import { useUserContext } from "./UserContext"

const CalendarContext = createContext<ICalendarContext>({
    selectedSlots: {
        endTime: null,
        startTime: null,
    },
    setSelectedSlots: () => {},
    selectedEvent: null,
    setSelectedEvent: () => {},
    events: [],
    fetchBookings: async() => {},
})
export const useCalendarContext = () => useContext(CalendarContext)

const CalendarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSlots, setSelectedSlots] = useState<ICalendarState | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<IBooking | null>(null)
    const [events, setEvents] = useState<IBooking[]>([])
    const { user } = useUserContext()

    const fetchBookings = async() => {
        try {
            if(!user?.uid) return;
            const snapshot = await getDocs(query(collection(db, "bookings"), 
                where("uuids", "array-contains", user.uid)
            ))
            const list: IBooking[] = []
            snapshot?.forEach(doc => list.push({ ...(doc.data() as unknown as IBooking), id: doc.id }))
            setEvents(list)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [user])

    return (
        <CalendarContext.Provider value={{ 
            selectedSlots,
            setSelectedSlots,
            selectedEvent,
            setSelectedEvent,
            events,
            fetchBookings,
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarProvider
