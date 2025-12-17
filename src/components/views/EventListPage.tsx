import { EventCard } from "@/components/views/EventCard"
import { useEvents } from "@/store/events/hooks/EventsContextHook"


export function EventListPage() {
    const {events} = useEvents()
   
     return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">All Events</h2>
            {events.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
    )
}
