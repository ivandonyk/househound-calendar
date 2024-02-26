import Calendar from "./_components/Calendar"

export const dynamic = "force-dynamic"

const getEvents = async() => {
  const response = await fetch(process.env.URL + "/api/getMontlyBookings")
  if(!response.ok) return []
  const data = await response.json()
  return data
}

export default async function Home() {
  const bookings = await getEvents()

  return (
    <div className="h-screen flex justify-center items-center">
      <Calendar bookings={bookings || []} />
    </div>
  )
}
