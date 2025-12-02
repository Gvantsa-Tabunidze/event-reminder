import { useEffect, useState } from "react"
import { getEvents } from "@/api/index.ts"
import { EventCard } from "@/components/views/EventCard"
import type { EventItem } from "@/api/type.ts"

export function EventListPage() {
    const [events, setEvents] = useState<EventItem[]>([])

    async function loadEvents() {
       try {
        const data = await getEvents()
        setEvents(data?.data ?? [])
       } catch (error) {
         console.log(error)
       }
    }

    useEffect(() => {
        loadEvents()
    }, [events])

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">All Events</h2>
            {events.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
    )
}
