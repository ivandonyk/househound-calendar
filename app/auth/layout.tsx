

export default function AuthLayout({
    children,
}: { children: React.ReactNode[]; }) {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-[500px] flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}