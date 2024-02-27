"use client"

import { useFormikContext } from "formik"
import classNames from "classnames"
import React from "react"

import { IFormButtonProps } from "../_types/components"
import { IFormikContext } from "../_types/common"

const FormButton: React.FC<IFormButtonProps> = ({ className, ...props }) => {
    const { handleSubmit } = useFormikContext<IFormikContext>()

    return (
        <button
            type="button"
            onClick={() => handleSubmit()}
            className={classNames(
                "p-2 border-2 border-black rounded-md",
                className
            )}
            {...props}
        />
    )
}

export default FormButton