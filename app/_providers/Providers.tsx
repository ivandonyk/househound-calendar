"use client"

import React from "react"

import "@/app/_lib/firebase/firebase"

import UserProvider from "@/app/_context/UserContext"
import ModalsProvider from "@/app/_context/ModalContext"

export function Providers({
    children,
}: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <UserProvider>
            <ModalsProvider>
                {children}
            </ModalsProvider>
        </UserProvider>
    )
}