"use client"

import { useFormikContext } from "formik"
import React from "react"

import { IFormSelectProps } from "@/app/_types/components"

import { IFormikContext } from "@/app/_types/common"

import { Role } from "@/app/_constants/constants"

const FormSelect: React.FC<IFormSelectProps> = ({ fieldName, ...props }) => {
    const { setFieldValue } = useFormikContext<IFormikContext>()
    return (
        <select 
            {...props}
            className="w-full p-2 border-2 border-black rounded-md"
            onChange={e => setFieldValue(fieldName, e.target.value)}
        >
            <option value="">Select a role</option>
            {Object.values(Role).map(role => <option key={role} value={role}>{role}</option>)}
        </select>
    )
}

export default FormSelect