"use client"

import { useRouter } from "next/navigation"
import { FormikValues } from "formik"

import FormButton from "@/app/_components/FormButton"
import FormInput from "@/app/_components/FormInput"
import Form from "@/app/_components/Form"

import { signupSchema } from "@/app/_schemas/schemas"

const SignupForm = () => {
    const router = useRouter()

    const handleSubmit = (values: FormikValues) => {}

    return (
        <Form
            initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
            onSubmit={values => handleSubmit(values)}
            validationSchema={signupSchema}
        >
            <div className="text-xl text-center">HouseHound Calendar Signup</div>
            <FormInput 
                placeholder="First Name"
                fieldName="firstName"
            />
            <FormInput
                placeholder="Last Name"
                fieldName="lastName"
            />
            <FormInput 
                placeholder="Email"
                fieldName="email"
            />
            <FormInput
                placeholder="Password"
                type="password"
                fieldName="password"
            />
            <FormButton>Signup</FormButton>
            <button 
                className="p-2 border-2 border-black rounded-md"
                onClick={() => router.push("/auth/login")}
            >
                Login
            </button>
        </Form>
    )
}

export default SignupForm