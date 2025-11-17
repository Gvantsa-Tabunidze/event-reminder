import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { getEvents } from "@/api/index.ts"
import { EventCard } from "@/components/views/EventCard"
import type { EventItem } from "@/api/type.ts"

export function DatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [events, setEvents] = useState<EventItem[]>([])

    async function loadEvents() {
        const allEvents = await getEvents()
        if (date) {
            const selectedDateStr = date.toISOString().split("T")[0] // YYYY-MM-DD
            const filtered = allEvents.filter(ev => ev.date === selectedDateStr)
            setEvents(filtered)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [date])

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">Current Month</h2>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
            />

            <div className="flex flex-col gap-2 mt-4">
                {events.length === 0 && <p>No events on this date.</p>}
                {events.map(ev => (
                    <EventCard key={ev.id} event={ev} onChange={loadEvents} />
                ))}
            </div>
        </div>
    )
}
