import Calendar from "./_components/Calendar"

export default async function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-primary-grad">
      <Calendar />
    </div>
  )
}
