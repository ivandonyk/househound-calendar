"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"

import { useUserContext } from "@/app/_context/UserContext"

import { Role } from "@/app/_constants/constants"

const Navbar = () => {
    const { role } = useUserContext()
    const router = useRouter()
    const [routes, setRoutes] = useState<any[]>([])
    
    useEffect(() => {
        const routes = [
            { label: "Add Availability", to: "/add-availability", role: [Role.Agent] },
            { label: "Calendar", to: "/", role: [Role.Agent, Role.Client] },
        ].filter(r => r.role.includes(role as Role))
        setRoutes(routes)
    }, [role])

    const handleLogout = async() => {
        try {
            const auth = getAuth()
            await auth.signOut()
            router.push("/auth/login")
        } catch (error) {
            console.log(error)
            alert("Failed to logout")
        }
    }

    if(!role) return <></>
    return (
        <div className="w-full flex justify-center items-center gap-4 p-2">
            {routes.map(({ to, label }) => <div 
                key={to}
                className="cursor-pointer text-black p-2 border-2 border-black rounded-sm"
                onClick={() => router.push(to)}
            >
                {label}
            </div>)}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar