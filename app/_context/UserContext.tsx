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

import { IUserContext } from "@/app/_types/context"

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
})
export const useUserContext = () => useContext(UserContext)

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider