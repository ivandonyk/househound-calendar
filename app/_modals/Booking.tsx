"use client"

import classNames from "classnames"
import { useEffect, useState } from "react"
import Image from "next/image"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"
import { useUserContext } from "@/app/_context/UserContext"

import { 
    useCreateBooking, 
    useUpdateBooking,
} from "@/app/_hooks/booking"

import ModalLayout from "@/app/_components/ModalLayout"

import { Modals } from "@/app/_constants/constants"

import { IUser } from "@/app/_types/entities"

import peopleSvg from "@/public/people.svg"
import crossSvg from "@/public/cross.svg"
import notesSvg from "@/public/notes.svg"
import clockSvg from "@/public/clock.svg"

const Booking = () => {
    const { selectedSlots, setSelectedSlots, selectedEvent, fetchBookings, setSelectedEvent } = useCalendarContext()
    const { setActiveModal } = useModalContext()
    const { users, user } = useUserContext()
    const { addBooking, isCreatingBooking } = useCreateBooking()
    const { updateBooking, isUpdatingBooking } = useUpdateBooking()
    const [showUsers, setShowUsers] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [notes, setNotes] = useState("")
    const [header, setHeader] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(selectedEvent) {
            setNotes(selectedEvent.notes)
            setHeader(selectedEvent.title)
            const userId = selectedEvent.uuids.find(id => id !== user?.uid)
            const targetUser = users.find(user => user.uid === userId)
            if(targetUser) setSelectedUser(targetUser)
        }
    }, [selectedEvent])

    const handleClose = () => {
        setSelectedSlots({ endTime: null, startTime: null })
        setNotes("")
        setHeader("")
        setSelectedUser(null)
        setSelectedEvent(null)
    }

    const onClose = () => {
        setActiveModal(null)
        handleClose()
    }

    const handleClick = async() => {
        if(!header || !selectedUser?.uid || !selectedSlots?.startTime || !selectedSlots?.endTime) return;
        // We create a new booking if there's no selected event
        if(!selectedEvent) {
            setLoading(true)
            await addBooking({
                notes,
                title: header,
                uuids: [selectedUser.uid, user?.uid || ""],
                endTime: selectedSlots.endTime.toISOString(),
                startTime: selectedSlots.startTime.toISOString(),
            })
            await fetchBookings()
            setLoading(false)
            onClose()
            return
        }
        // Otherwise we update existing event / booking
        setLoading(true)
        await updateBooking({
            id: selectedEvent.id,
            notes,
            title: header,
            uuids: [selectedUser.uid, user?.uid || ""],
            endTime: selectedEvent.endTime,
            startTime: selectedEvent.startTime,
        })
        await fetchBookings()
        setLoading(false)
        onClose()
    }

    const handleUserSelect = (user: IUser) => {
        setSelectedUser(user)
        setShowUsers(false)
    }

    const isLoading = isCreatingBooking || isUpdatingBooking || loading

    return (
        <ModalLayout modal={Modals.Booking} onClose={handleClose}>
            <div className="w-full flex flex-col gap-[26px] h-screen max-w-[421px] max-h-[426px] rounded-md py-4 bg-white px-[15px] z-10">
                <div onClick={onClose} className="cursor-pointer flex justify-end">
                    <Image src={crossSvg} alt="" />
                </div>
                <input 
                    placeholder="Add header"
                    className="border-b-[1px] border-gray-2 pb-2 text-[22px] leading-[33px] focus:outline-none"
                    onChange={e => setHeader(e.target.value)}
                    value={header}
                />
                <div className="w-full relative flex items-center">
                    <div className="absolute top-[6px]">
                        <Image src={notesSvg} alt="" />
                    </div>
                    <input 
                        placeholder="Add notes"
                        className="pl-[40px] w-full border-b-[1px] border-gray-2 font-[400] pb-2 text-[18px] leading-[27px] focus:outline-none"
                        onChange={e => setNotes(e.target.value)}
                        value={notes}
                    />
                </div>
                <div className="flex flex-row gap-[13px] border-b-[1px] border-gray-2 pb-2">
                    <div className="h-full w-[25px]">
                        <Image src={clockSvg} alt="" />
                    </div>
                    <div className="w-full flex flex-col gap-[9px]">
                        <div className="font-[400] text-[18px] leading-[27px]">
                            {selectedEvent?.title ? 
                            selectedSlots?.startTime?.utc().format("dddd, DD MMMM")
                            : selectedSlots?.startTime?.format("dddd, DD MMMM")}
                        </div>
                        <div className="font-[400] text-[14px] leading-[21px] text-gray-3">
                            {selectedEvent?.title ? 
                                `${selectedSlots?.startTime?.utc().format("hh.mm a")} - ${selectedSlots?.endTime?.utc().format("hh.mm a")}`
                            : `${selectedSlots?.startTime?.format("hh.mm a")} - ${selectedSlots?.endTime?.format("hh.mm a")}`}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-[13px] relative">
                    <div className="h-full w-[25px] flex items-center justify-center">
                        <Image src={peopleSvg} alt="" />
                    </div>
                    <div className="w-[80%]">
                        <input 
                            className="h-full w-full rounded-sm bg-gray-4 px-[11px] py-[14px] focus:outline-none"
                            placeholder="Add people"
                            onFocus={() => setShowUsers(true)}
                            value={selectedUser?.email}
                        />
                    </div>
                    {showUsers && <div className="absolute bottom-[-40px] left-[38px] z-30 w-[80%] bg-white flex flex-col max-h-[250px] overflow-auto">
                        {users.map(user => <div 
                            key={user.uid}
                            className="w-full p-2 cursor-pointer text-black hover:bg-primary-blue hover:text-white font-[500]"
                            onClick={() => handleUserSelect(user)}
                        >
                            {user.email}
                        </div>)}
                    </div>}
                </div>
                <div className="w-full flex flex-row justify-end gap-4">
                    <button 
                        disabled={isLoading}
                        className="text-black-2 font-[400] text-[16px] leading-[15px]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        disabled={isLoading}
                        className={classNames(
                            "w-[107px] rounded-[3px] bg-blue-1 text-white",
                            "py-[12px] px-[26px]"
                        )}
                        onClick={handleClick}
                    >
                        {isLoading ? 'loading...' : selectedEvent?.title ? 'Edit' : 'Create'}
                    </button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default Booking
