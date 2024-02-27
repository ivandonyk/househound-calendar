"use client"

import { FormikValues } from "formik"

import FormInput from "@/app/_components/FormInput"
import Form from "@/app/_components/Form"
import FormButton from "@/app/_components/FormButton"
import { loginSchema } from "@/app/_schemas/schemas"

const LoginForm = () => {

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
        </Form>
    )
}

export default LoginForm