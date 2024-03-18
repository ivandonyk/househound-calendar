"use client"

import { 
    addDoc, 
    collection,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore"
import { Moment } from "moment"
import { useEffect, useState } from "react"

import { db } from "@/app/_lib/firebase/firebase"

import { useCalendarContext } from "@/app/_context/CalendarContext"

import { formatMoment, getMoment } from "@/app/_utils/date"

import { IAvailability } from "@/app/_types/entities"

export const useAvailabillities = (agentId: string) => {
    const [availabilities, setAvailabilities] = useState<IAvailability[]>([])

    const fetchAvailabilities = async() => {
        try {
            const snapshot = await getDocs(query(collection(db, "availability"), 
                where("uid", "==", agentId)
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

    useEffect(() => {
        fetchAvailabilities()
    }, [])

    return { availabilities, setAvailabilities, fetchAvailabilities }
}

export const useAddAvailability = () => {
    const [loading, setLoading] = useState(false)
    const { fetchAvailabilities } = useCalendarContext()

    const addAvailability = async(uid: string, to: Moment, from: Moment) => {
        try {
            setLoading(true)
            await addDoc(collection(db, "availability"), {
                uid,
                to: formatMoment(to),
                from: formatMoment(from),
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
                to: !to ? to : formatMoment(to),
                from: !from ? from : formatMoment(from),
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
