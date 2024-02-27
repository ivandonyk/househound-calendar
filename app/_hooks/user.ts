"use client"

import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithCustomToken
} from "firebase/auth"

import { useUserContext } from "@/app/_context/UserContext"

import { setToken } from "@/app/_utils/token"

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

    const signUp = async(email: string, password: string) => {
        try {
            const auth = getAuth()
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            const token = await user.getIdToken()
            setToken(token)
            setUser(user)
        } catch (error) {
            console.log(error)
            alert("sign up error")
        }
    }

    return { signUp }
}