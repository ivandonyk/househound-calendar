"use client"

import React from "react"
import { Toaster } from "react-hot-toast"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import "@/app/_lib/firebase/firebase"

import UserProvider from "@/app/_context/UserContext"
import ModalsProvider from "@/app/_context/ModalContext"
import CalendarProvider from "@/app/_context/CalendarContext"
import moment from "moment"

export function Providers({
    children,
}: { children: React.ReactNode | React.ReactNode[] }) {
    moment.updateLocale("en-US", { week: { dow: 1 } })
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <UserProvider>
                <CalendarProvider>
                    <ModalsProvider>
                        <Toaster />
                        {children}
                    </ModalsProvider>
                </CalendarProvider>
            </UserProvider>
        </LocalizationProvider>
    )
}