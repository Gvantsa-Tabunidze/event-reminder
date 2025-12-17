import { useEvents } from "@/store/events/hooks/EventsContextHook"
import { EventCard } from "./views/EventCard"


const Upcomingevents = () => {
const {events} = useEvents()
// const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([])
// useEffect(() => {
//   const fetchUpcomingEvents =async() => {
//     const result =  await  getEvents( true, 3 )
//     if(result.success) setUpcomingEvents(result.data)
//   }
// fetchUpcomingEvents()
// }, [getEvents]);
const filteredEvents = events
.filter(ev => ev.date && new Date(ev.date) >= new Date())
.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
 .slice(0, 3) 

return (
<div className="flex flex-col gap-4 w-full h-full">
    <h2 className="text-2xl font-medium">All Events</h2>
    {filteredEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
</div>
)
}

export default Upcomingevents