import AddAvailabilityForm from "@/app/add-availability/_components/AddAvailabilityForm"

import Auth from "@/app/_components/Auth"

export default function AddAvailability() {
    return <Auth Element={<AddAvailabilityForm />} auth />
}