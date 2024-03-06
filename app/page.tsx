import Calendar from "@/app/_components/Calendar"
import Auth from "@/app/_components/Auth"

export default async function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-primary-grad">
      <Auth auth={true} Element={<Calendar />} />
    </div>
  )
}
