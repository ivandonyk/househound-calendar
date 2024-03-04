"use client"

import OptionsModal from "./OptionsModal"
import Booking from "./Booking"

const Modals = () => {
    const modals = [OptionsModal, Booking]
    return (
        <>
            {modals.map((Modal, index) => <Modal key={index} />)}
        </>
    )
}

export default Modals