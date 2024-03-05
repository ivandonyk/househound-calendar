"use client"

import { 
    addDoc, 
    collection,
    updateDoc,
    doc,
} from "firebase/firestore"
import { useState } from "react"

import { db } from "@/app/_lib/firebase/firebase"

import { 
    ICreateBookingPayload, 
    IUpdateBookingPayload,
} from "@/app/_types/hooks"

export const useBookings = () => {
}

export const useCreateBooking = () => {
    const [loading, setLoading] = useState(false)

    const addBooking = async(payload: ICreateBookingPayload) => {
        try {
            setLoading(true)
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

    const updateBooking = async(payload: IUpdateBookingPayload) => {
        try {
            setLoading(true)
            const { id, ...rest } = payload
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
