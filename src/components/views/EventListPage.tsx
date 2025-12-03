import { useEffect, useState } from "react"
import { EventCard } from "@/components/views/EventCard"
import type { EventItem } from "@/api/type.ts"
import { useEvents } from "@/store/events/hooks/EventsContextHook"


export function EventListPage() {
    const {getEvents, events} = useEvents()
  

    useEffect(() => {
       getEvents()
    }, [])

    
     return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">All Events</h2>
            {events.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
    )
}
