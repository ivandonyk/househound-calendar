"use client"

import React, { 
    createContext, 
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

import { IAvailability, IBooking } from "@/app/_types/entities"

import { formatMoment, getMoment } from "@/app/_utils/date"

import { db } from "@/app/_lib/firebase/firebase"

import { Role } from "@/app/_constants/constants"

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
    availabilities: [],
    fetchAvailabilities: async() => {},
})
export const useCalendarContext = () => useContext(CalendarContext)

const CalendarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [selectedSlots, setSelectedSlots] = useState<ICalendarState | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<IBooking | null>(null)
    const [events, setEvents] = useState<IBooking[]>([])
    const [availabilities, setAvailabilities] = useState<IAvailability[]>([])
    const { user, role } = useUserContext()

    const fetchAvailabilities = async() => {
        try {
            if(!user?.uid) return;
            if(role !== Role.Agent) return;
            const snapshot = await getDocs(query(collection(db, "availability"), 
                where("uid", "==", user.uid)
            ))
            const list: any[] = []
            snapshot?.forEach(doc => list.push({ ...(doc.data() as unknown as IAvailability), id: doc.id }))
            const parsed = list.map((item: any) => ({ 
                ...item, 
                to: item?.to ? getMoment(item.to) : undefined,
                from: item?.from ? getMoment(item.from) : undefined,
            }))
            setAvailabilities(parsed)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBookings = async() => {
        try {
            if(!user?.uid) return;
            const snapshot = await getDocs(query(collection(db, "bookings"), 
                where("uuids", "array-contains", user.uid)
            ))
            const list: IBooking[] = []
            snapshot?.forEach(doc => {
                const booking = doc.data() as unknown as IBooking
                list.push({ 
                    ...booking, 
                    startTime: formatMoment(getMoment(booking.startTime)),
                    id: doc.id 
                })
            })
            setEvents(list)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [user])

    useEffect(() => {
        if(user?.uid && role === Role.Agent) fetchAvailabilities()
    }, [user, role])

    return (
        <CalendarContext.Provider value={{ 
            selectedSlots,
            setSelectedSlots,
            selectedEvent,
            setSelectedEvent,
            events,
            fetchBookings,
            availabilities,
            fetchAvailabilities,
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarProvider
