"use client"

import { useLayoutEffect, useState } from "react"

const useScreen = () => {
    const [width, setWidth] = useState(1400)

    useLayoutEffect(() => {
        const listener = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [])

    return { width }
}

export default useScreen
