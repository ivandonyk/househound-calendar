import CalendarCard from "./_components/CalendarCard"
import Auth from "@/app/_components/Auth"

import "./agent-calendar.css"

export default function AgentCalendar() {
    return <div className="w-full h-full-with-nav">
        <Auth auth Element={<CalendarCard />} />
    </div>
}
