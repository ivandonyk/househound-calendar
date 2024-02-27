

export default function Signup() {
    return (
        <>
            <div className="text-xl text-center">HouseHound Calendar Signup</div>
            <input
                placeholder="Email"
                className="w-full p-2 border-2 border-black rounded-md"
            />
            <input
                placeholder="Password"
                className="w-full p-2 border-2 border-black rounded-md"
                type="password"
            />
            <button
                className="p-2 border-2 border-black rounded-md"
            >
                Signup
            </button>
        </>
    )
}