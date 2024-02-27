"use client"

import { useFormikContext } from "formik"
import classNames from "classnames"
import React from "react"

import { ITextInputProps } from "../_types/components"
import { IFormikContext } from "../_types/common"

const FormInput: React.FC<ITextInputProps> = ({ fieldName, ...props }) => {
    const { 
        values,
        errors,
        touched,
        setFieldTouched,
        handleChange 
    } = useFormikContext<IFormikContext>()

    return (
        <input
            value={values[fieldName]}
            onChange={handleChange(fieldName)}
            onBlur={() => setFieldTouched(fieldName)}
            className={classNames(
                "w-full p-2 border-2 border-black rounded-md",
                props.className,
                { "text-red-500 border-red-500": touched[fieldName] && !!errors[fieldName] }
            )}
            {...props}
        />
    )
}

export default FormInput