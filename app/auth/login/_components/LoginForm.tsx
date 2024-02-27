"use client"

import { useRouter } from "next/navigation"
import { FormikValues } from "formik"

import FormButton from "@/app/_components/FormButton"
import FormInput from "@/app/_components/FormInput"
import Form from "@/app/_components/Form"

import { loginSchema } from "@/app/_schemas/schemas"

const LoginForm = () => {
    const router = useRouter()

    const handleSubmit = (values: FormikValues) => {}

    return (
        <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={values => handleSubmit(values)}
            validationSchema={loginSchema}
        >
            <div className="text-xl text-center">HouseHound Calendar Login</div>
            <FormInput 
                placeholder="Email"
                name="email"
                fieldName="email"
            />
            <FormInput
                placeholder="Password"
                type="password"
                fieldName="password"
            />
            <FormButton>Login</FormButton>
            <button 
                className="p-2 border-2 border-black rounded-md"
                onClick={() => router.push("/auth/signup")}
            >
                Signup
            </button>
        </Form>
    )
}

export default LoginForm