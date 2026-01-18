import { useEvents } from "@/store/events/hooks/EventsContextHook"
import { EventCard } from "./views/EventCard"


const Upcomingevents = () => {
const {events} = useEvents()
const filteredEvents = events
.filter(ev => ev.date && new Date(ev.date) >= new Date())
.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
.slice(0, 3) 


return (
<div className="flex flex-col gap-4 w-full h-full">
    <h2 className="text-2xl font-medium">All Events</h2>
    {filteredEvents.length > 0 ? filteredEvents.map(ev => <EventCard key={ev.id} event={ev} highlight={false}/>) : <p className="text-secondary">There is no upcoming events</p>}
</div>
)
}

export default Upcomingevents