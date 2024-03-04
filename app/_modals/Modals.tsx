"use client"

import OptionsModal from "./OptionsModal"

const Modals = () => {
    const modals = [OptionsModal]
    return (
        <>
            {modals.map((Modal, index) => <Modal key={index} />)}
        </>
    )
}

export default Modals