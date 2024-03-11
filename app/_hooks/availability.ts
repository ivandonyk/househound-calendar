"use client"

import { 
    addDoc, 
    collection,
    doc,
    Timestamp,
    updateDoc,
    deleteDoc,
} from "firebase/firestore"
import { Moment } from "moment"
import { useState } from "react"

import { useCalendarContext } from "@/app/_context/CalendarContext"

import { db } from "@/app/_lib/firebase/firebase"

export const useAddAvailability = () => {
    const [loading, setLoading] = useState(false)
    const { fetchAvailabilities } = useCalendarContext()

    const addAvailability = async(uid: string, to: Moment, from: Moment) => {
        try {
            setLoading(true)
            await addDoc(collection(db, "availability"), {
                uid,
                to: Timestamp.fromDate(to.utc().toDate()),
                from: Timestamp.fromDate(from.utc().toDate()),
            })
            await fetchAvailabilities()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to add availability")
        }
    }

    return { addAvailability, isLoading: loading }
}

export const useUpdateAvailability = () => {
    const [loading, setLoading] = useState(false)
    const { fetchAvailabilities } = useCalendarContext()

    const updateAvailability = async(id: string, to?: Moment, from?: Moment) => {
        try {
            setLoading(true)
            const docRef = doc(db, "availability", id)
            const payload = {
                to: !to ? to : Timestamp.fromDate(to.utc().toDate()),
                from: !from ? from  :Timestamp.fromDate(from.utc().toDate()),
            }
            if(!payload.to) delete payload.to
            if(!payload.from) delete payload.from
            await updateDoc(docRef, payload)
            await fetchAvailabilities()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to update availability")
        }
    }

    return { updateAvailability, isLoading: loading }
}

export const useDeleteAvailability = () => {
    const [loading, setLoading] = useState(false)
    const { fetchAvailabilities } = useCalendarContext()

    const deleteAvailability = async(id: string) => {
        try {
            setLoading(true)
            const docRef = doc(db, "availability", id)
            await deleteDoc(docRef)
            await fetchAvailabilities()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to delete availability")
        }
    }

    return { deleteAvailability, isDeleting: loading }
}
