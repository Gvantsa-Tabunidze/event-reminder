import {Card} from "@/components/Card.tsx";

const UpcomingEvents = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">Upcoming Events</h2>
            <Card/>
            <Card/>
        </div>
    )
}
export default UpcomingEvents
