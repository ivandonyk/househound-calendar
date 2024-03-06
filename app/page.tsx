import Calendar from "@/app/_components/Calendar"
import Auth from "@/app/_components/Auth"

import "./calendar.css"

export default async function Home() {
  return (
    <div className="calendar-component h-screen flex justify-center items-center bg-primary-grad">
      <Auth auth={true} Element={<Calendar />} />
    </div>
  )
}
