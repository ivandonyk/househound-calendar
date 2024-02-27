"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { useUserContext } from "@/app/_context/UserContext"

import { IAuthProps } from "@/app/_types/common"

const Auth: React.FC<IAuthProps> = ({ auth, Element }) => {
    const { user } = useUserContext()
    const router = useRouter()

    if(!auth && user?.uid) {
        router.push("/")
        return <></>
    }

    else if(auth && !user?.uid) {
        router.push("/auth/login")
        return <></>
    }

    return Element;
}

export default Auth