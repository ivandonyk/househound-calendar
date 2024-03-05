"use client"

import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import { 
    collection, 
    addDoc,
} from "firebase/firestore"

import { useUserContext } from "@/app/_context/UserContext"

import { db } from "@/app/_lib/firebase/firebase"

import { setToken } from "@/app/_utils/token"

import { Role } from "@/app/_constants/constants"

export const useLogin = () => {
    const { setUser } = useUserContext()

    const login = async(email: string, password: string) => {
        try {
            const auth = getAuth()
            const data = await signInWithEmailAndPassword(auth, email, password)
            const token = await data.user.getIdToken()
            setToken(token)
            setUser(data.user)
        } catch (error) {
            console.log(error)
            alert("signin error")
        }
    }

    return { login }
}

export const useSignup = () => {
    const { setUser } = useUserContext()

    const signUp = async(firstName: string, lastName: string, email: string, password: string, role: Role) => {
        try {
            const auth = getAuth()
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            const token = await user.getIdToken()
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                role,
                firstName,
                lastName,
                email
            })
            setToken(token)
            setUser(user)
        } catch (error) {
            console.log(error)
            alert("sign up error")
        }
    }

    return { signUp }
}