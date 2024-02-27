"use client"

import React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState,
} from "react"
import { 
    User, 
    getAuth,
} from "firebase/auth"
import { 
    collection, 
    query, 
    where, 
    getDocs 
} from "firebase/firestore"

import { IUserContext } from "@/app/_types/context"

import { Role } from "@/app/_constants/constants"

import { db } from "@/app/_lib/firebase/firebase"

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    role: null,
    setRole: () => {},
})
export const useUserContext = () => useContext(UserContext)

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<Role | null>(null)

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged(user => {
            if(user) {
                setUser(user)
            }
        })
    }, [])

    useEffect(() => {
        const getRoleInfo = async() => {
            try {
                if(!user?.uid) return;
                const snapshot = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)))
                snapshot?.forEach(doc => setRole(doc.get("role")))
            } catch (error) {}
        }
        getRoleInfo()
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, role, setRole }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider