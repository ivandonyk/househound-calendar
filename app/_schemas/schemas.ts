"use client"

import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export const signupSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})