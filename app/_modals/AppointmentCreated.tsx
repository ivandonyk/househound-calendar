"use client"

import Image from "next/image"

import ModalLayout from "@/app/_components/ModalLayout"

import { Modals } from "@/app/_constants/constants"

import blueRoundCheckSvg from "@/public/blueRoundCheck.svg"

const AppointmentCreated = () => {
    return (
        <ModalLayout
            
            modal={Modals.AppointmentCreated}
        >
            <div className="bg-white w-[213px] h-[88px] mt-auto mb-4 flex justify-center items-center flex-col gap-2 rounded-lg">
                <Image
                    src={blueRoundCheckSvg}
                    alt=""
                />
                <div className="font-[500] text-[14px] leading-[20px] text-black-3">
                    Appointment created
                </div>
            </div>
        </ModalLayout>
    )
}

export default AppointmentCreated
