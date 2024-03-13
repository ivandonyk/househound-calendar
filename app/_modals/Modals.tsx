"use client"

import AppointmentCreated from "./AppointmentCreated"
import OptionsModal from "./OptionsModal"
import Booking from "./Booking"

const Modals = () => {
    const modals = [OptionsModal, Booking, AppointmentCreated]
    return (
        <>
            {modals.map((Modal, index) => <Modal key={index} />)}
        </>
    )
}

export default Modals