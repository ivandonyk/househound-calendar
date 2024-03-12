"use client"

import { 
    addDoc, 
    collection,
    updateDoc,
    doc,
    getDocs,
    query,
    where,
    deleteDoc,
} from "firebase/firestore"
import { useState } from "react"
import moment from "moment"
import { toast } from "react-hot-toast"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useUserContext } from "@/app/_context/UserContext"

import { db } from "@/app/_lib/firebase/firebase"

import { 
    ICreateBookingPayload, 
    IUpdateBookingPayload,
} from "@/app/_types/hooks"

import { Role } from "@/app/_constants/constants"

import { IAvailability } from "@/app/_types/entities"

export const useBookings = () => {
}

export const useCreateBooking = () => {
    const [loading, setLoading] = useState(false)
    const { user, role } = useUserContext()

    const addBooking = async(payload: ICreateBookingPayload) => {
        try {
            setLoading(true)
            if(role === Role.Client) {
                const snapshot = await getDocs(query(
                    collection(db, "availability"), 
                    where("uid", "==", payload.uuids.find(id => id !== user?.uid)),
                ))
                let availabilities: IAvailability[] = [];
                snapshot.forEach(doc => {
                    availabilities.push(doc.data() as unknown as IAvailability)
                })
                const dates = availabilities.map(availability => ({ 
                    ...availability,
                    from: moment(availability.from.seconds*1000),
                    to: moment(availability.to.seconds*1000) 
                }))
                const availableDate = dates.find(date => 
                    moment(date.from).isSameOrBefore(moment(payload.startTime))
                    && moment(date.to).isSameOrAfter(moment(payload.endTime))
                )
                if(!availableDate) {
                    setLoading(false)
                    return toast.error("Agent not available on selected date")
                }
            }
            await addDoc(collection(db, "bookings"), payload)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to create booking")
        }
    }

    return { addBooking, isCreatingBooking: loading }
}

export const useUpdateBooking = () => {
    const [loading, setLoading] = useState(false)
    const { user, role } = useUserContext()

    const updateBooking = async(payload: IUpdateBookingPayload) => {
        try {
            setLoading(true)
            const { id, ...rest } = payload
            if(role === Role.Client) {
                const snapshot = await getDocs(query(
                    collection(db, "availability"), 
                    where("uid", "==", payload?.uuids?.find(id => id !== user?.uid) || ""),
                ))
                let availabilities: IAvailability[] = [];
                snapshot.forEach(doc => {
                    availabilities.push(doc.data() as unknown as IAvailability)
                })
                const dates = availabilities.map(availability => ({ 
                    ...availability,
                    from: moment(availability.from),
                    to: moment(availability.to) 
                }))
                const availableDate = payload?.startTime ? dates.find(date => 
                    moment(date.from).isSameOrBefore(moment(payload.startTime))
                    && moment(date.to).isSameOrAfter(moment(payload.endTime))
                ) : dates.find(date => moment(date.to).isSameOrAfter(moment(payload.endTime)));
                if(!availableDate) {
                    setLoading(false)
                    return toast.error("Agent not available on selected date")
                }
            }
            await updateDoc(doc(db, "bookings", `${id}`), rest)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to update booking")
        }
    }

    return { updateBooking, isUpdatingBooking: loading }
}

export const useDeleteBooking = () => {
    const [loading, setLoading] = useState(false)
    const { fetchBookings } = useCalendarContext()

    const deleteBooking = async(id: string) => {
        try {
            setLoading(true)
            const docRef = doc(db, "bookings", id)
            await deleteDoc(docRef)
            await fetchBookings()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to delete booking")
        }
    }

    return { deleteBooking, isDeletingBooking: loading }
}
