"use client"

import classNames from "classnames"
import Image from "next/image"
import moment from "moment"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"

import ModalLayout from "@/app/_components/ModalLayout"

import { Modals } from "@/app/_constants/constants"

import peopleSvg from "@/public/people.svg"
import crossSvg from "@/public/cross.svg"
import notesSvg from "@/public/notes.svg"
import clockSvg from "@/public/clock.svg"

const Booking = () => {
    const { selectedSlots, setSelectedSlots } = useCalendarContext()
    const { setActiveModal } = useModalContext()

    const handleClose = () => {
        setSelectedSlots({ endTime: null, startTime: null })
    }

    const onClose = () => {
        setActiveModal(null)
        handleClose()
    }

    return (
        <ModalLayout modal={Modals.Booking} onClose={handleClose}>
            <div className="w-full flex flex-col gap-[26px] h-screen max-w-[421px] max-h-[426px] rounded-md py-4 bg-white px-[15px] z-10">
                <div onClick={onClose} className="cursor-pointer flex justify-end">
                    <Image src={crossSvg} alt="" />
                </div>
                <input 
                    placeholder="Add header"
                    className="border-b-[1px] border-gray-2 pb-2 text-[22px] leading-[33px] focus:outline-none"
                />
                <div className="w-full relative flex items-center">
                    <div className="absolute top-[6px]">
                        <Image src={notesSvg} alt="" />
                    </div>
                    <input 
                        placeholder="Add notes"
                        className="pl-[40px] w-full border-b-[1px] border-gray-2 font-[400] pb-2 text-[18px] leading-[27px] focus:outline-none"
                    />
                </div>
                <div className="flex flex-row gap-[13px] border-b-[1px] border-gray-2 pb-2">
                    <div className="h-full w-[25px]">
                        <Image src={clockSvg} alt="" />
                    </div>
                    <div className="w-full flex flex-col gap-[9px]">
                        <div className="font-[400] text-[18px] leading-[27px]">
                            {moment(selectedSlots?.startTime).format("dddd, DD MMMM")}
                        </div>
                        <div className="font-[400] text-[14px] leading-[21px] text-gray-3">
                            {`${moment(selectedSlots?.startTime).format("hh.mm a")} - ${moment(selectedSlots?.endTime).format("hh.mm a")}`}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-[13px]">
                    <div className="h-full w-[25px] flex items-center justify-center">
                        <Image src={peopleSvg} alt="" />
                    </div>
                    <div className="w-[80%]">
                        <input 
                            className="h-full w-full rounded-sm bg-gray-4 px-[11px] py-[14px] focus:outline-none"
                            placeholder="Add people"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-end gap-4">
                    <button 
                        className="text-black-2 font-[400] text-[16px] leading-[15px]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className={classNames(
                        "w-[107px] rounded-[3px] bg-blue-1 text-white",
                        "py-[12px] px-[26px]"
                    )}>
                        Create
                    </button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default Booking
