import AvailabilityCard from "@/app/agent-availability/_components/AvailabilityCard"
import Auth from "@/app/_components/Auth"

export default function AgentAvailability() {
    return <div className="w-full h-full-with-nav bg-primary-grad py-[50px] px-[30px]">
        <Auth auth Element={<AvailabilityCard />} />
    </div>
}
