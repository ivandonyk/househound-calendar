"use client"

import { useRouter } from "next/navigation"

import React, { useEffect, useState } from "react"

import { useUserContext } from "@/app/_context/UserContext"

import { IAuthProps } from "@/app/_types/common"

const Auth: React.FC<IAuthProps> = ({ auth, Element }) => {
    const { user } = useUserContext()
    const router = useRouter()
    const [r, setR] = useState<any>()

    useEffect(() => {
        setR(router)
    }, [router])

    if(!auth && user?.uid) {
        r?.push("/")
        return <></>
    }

    else if(auth && !user?.uid) {
        r?.push("/auth/login")
        return <></>
    }

    return Element;
}

export default Auth