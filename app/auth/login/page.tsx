import LoginForm from "@/app/auth/login/_components/LoginForm"
import Auth from "@/app/_components/Auth"

export default function Login() {
    return <Auth Element={<LoginForm />} auth={false} />
}