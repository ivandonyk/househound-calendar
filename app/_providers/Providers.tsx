"use client"

import React from "react"
import { Toaster } from "react-hot-toast"

import "@/app/_lib/firebase/firebase"

import UserProvider from "@/app/_context/UserContext"
import ModalsProvider from "@/app/_context/ModalContext"
import CalendarProvider from "@/app/_context/CalendarContext"

export function Providers({
    children,
}: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <UserProvider>
            <CalendarProvider>
                <ModalsProvider>
                    <Toaster />
                    {children}
                </ModalsProvider>
            </CalendarProvider>
        </UserProvider>
    )
}