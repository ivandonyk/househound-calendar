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
import { IUser } from "@/app/_types/entities"

import { Role } from "@/app/_constants/constants"

import { db } from "@/app/_lib/firebase/firebase"

import { removeToken } from "@/app/_utils/token"


export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    role: null,
    setRole: () => {},
    users: [],
})
export const useUserContext = () => useContext(UserContext)

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<Role | null>(null)

    /**
     * Contains Clients if logged in user is Agent
     * Otherwise contains Agents
     */
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged(user => {
            if(user) {
                setUser(user)
            }
            else {
                setUser(null)
                setRole(null)
                removeToken()
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

    useEffect(() => {
        const getUsersList = async() => {
            try {
                if(!role) return;
                const targetRole = {
                    [Role.Agent]: Role.Client,
                    [Role.Client]: Role.Agent,
                }
                const snapshot = await getDocs(query(collection(db, "users"), where("role", "==", targetRole[role])))
                const list: IUser[] = []
                snapshot?.forEach(doc => list.push(doc.data() as unknown as IUser))
                setUsers(list)
            } catch (error) {}
        }
        getUsersList()
    }, [role])

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
            role, 
            setRole,
            users,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider