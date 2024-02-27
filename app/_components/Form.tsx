"use client"

import React from "react"
import { Formik } from "formik"

import { IFormProps } from "../_types/components"

const Form: React.FC<IFormProps> = ({ children, ...props }) => {
    return (
        <Formik
            {...props}
        >
            <>
                {children}
            </>
        </Formik>
    )
}

export default Form