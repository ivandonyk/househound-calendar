import SignupForm from "@/app/auth/signup/_components/SignupForm"
import Auth from "@/app/_components/Auth"

export default function Signup() {
    return <Auth Element={<SignupForm />} auth={false} />
}