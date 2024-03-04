"use client"

import Image from "next/image"
import moment from "moment"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"

import ModalLayout from "@/app/_components/ModalLayout"

import { Modals } from "@/app/_constants/constants"

import checkTickCircleSvg from "@/public/checkTickCircle.svg"
import minusCircleSvg from "@/public/minusCircle.svg"
import calendarSvg from "@/public/calendar.svg"
import crossSvg from "@/public/cross.svg"

const OptionsModal = () => {
    const { selectedSlots, setSelectedSlots } = useCalendarContext()
    const { setActiveModal } = useModalContext()

    const options = [
        { 
            icon: <Image src={calendarSvg} alt="" />, 
            text: "Add appointment", 
            onClick: () => setActiveModal(Modals.Booking)
        },
        { 
            icon: <Image src={checkTickCircleSvg} alt="" />, 
            text: "Add availability", 
            onClick: () => {} 
        },
        { 
            icon: <Image src={minusCircleSvg} alt="" />, 
            text: "Add unavailability", 
            onClick: () => {} 
        },
    ]

    const handleClose = () => {
        setSelectedSlots({ endTime: null, startTime: null })
    }

    const onClose = () => {
        setActiveModal(null)
        handleClose()
    }

    return (
        <ModalLayout 
            modal={Modals.OptionsModal} 
            onClose={handleClose}
        >
            <div className="w-full max-w-[240px] py-[11px] px-[19px] flex flex-col justify-between h-screen max-h-[223px] rounded-md bg-white z-20">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 justify-center">
                        {selectedSlots?.startTime ? <div className="text-[18px] leading-[27px] font-[500] text-black-2">
                            {moment(selectedSlots.startTime).format("dddd DD,")}
                        </div> : <></>}
                        {selectedSlots?.endTime ? <div className="text-[16px] leading-[24px] font-[500] text-gray-2">
                            {moment(selectedSlots?.startTime).format('hh a')} - {moment(selectedSlots?.endTime).format('hh a')}
                        </div> : <></>}
                    </div>
                    <div onClick={onClose} className="cursor-pointer">
                        <Image src={crossSvg} alt="" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {options.map(option => <div
                        className="w-full flex flex-row cursor-pointer"
                        key={option.text}
                        onClick={option.onClick}
                    >
                        <div>{option.icon}</div>
                        <div className="text-[16px] font-[400] leading-[24px] ml-[12px]">{option.text}</div>
                    </div>)}
                </div>
            </div>
        </ModalLayout>
    )
}

export default OptionsModal