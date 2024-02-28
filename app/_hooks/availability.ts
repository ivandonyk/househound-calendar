"use client"

import { 
    addDoc, 
    collection,
} from "firebase/firestore"
import { Moment } from "moment"
import { useState } from "react"

import { db } from "@/app/_lib/firebase/firebase"

export const useAddAvailability = () => {
    const [loading, setLoading] = useState(false)

    const addAvailability = async(uid: string, to: Moment, from: Moment) => {
        try {
            setLoading(true)
            await addDoc(collection(db, "availability"), {
                uid,
                to: to.utc().toISOString(),
                from: from.utc().toISOString(),
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Failed to add availability")
        }
    }

    return { addAvailability, isLoading: loading }
}