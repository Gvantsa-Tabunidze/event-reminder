import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { EventCard } from "@/components/views/EventCard"
import { getEvents } from "@/api/index.ts"
import type { EventItem } from "@/api/type.ts"
import  EventModal  from "../EventModal"
import { Button } from "@/components/ui/button"


export function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [events, setEvents] = useState<EventItem[]>([])
    const [modalOpen, setModalOpen] = useState(false)


    async function loadEvents() {
        const allEvents = await getEvents()
        console.log(allEvents.data)
        if (!date) return
        const selectedDateStr = date.toLocaleDateString("en-CA")
        const filtered = allEvents.data?.filter(ev => ev.date === selectedDateStr)
        setEvents(filtered ?? [])
    }

    useEffect(() => {
        loadEvents()
    }, [date])

    function handleDateSelect(selectedDate: Date | undefined) {
        if (!selectedDate) return
        setDate(selectedDate)
        // setModalOpen(true)
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">
                {date ? date.toLocaleString("default", {month: "long", year: "numeric"}) : ""}
            </h2>
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                />
                <div className="mt-4">
                    <Button size="sm" className="w-auto" onClick={() => setModalOpen(true)}> Add Event </Button>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
            {events.length === 0 && <p>No events on this date.</p>}
            {events.map(ev => <EventCard key={ev.id} event={ev}/>)}
            </div>
            {modalOpen && <EventModal onClose={()=>{
                setModalOpen(false)
                loadEvents()
                }}/>}
        </div>
    )
}


