import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { EventCard } from "@/components/views/EventCard"
import { getEvents, createEvent } from "@/api/index.ts"
import type { EventItem } from "@/api/type.ts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { useSession } from "@clerk/clerk-react"

export function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [events, setEvents] = useState<EventItem[]>([])
    const [modalOpen, setModalOpen] = useState(false)

    // form state
    const [title, setTitle] = useState("")
    const [badge, setBadge] = useState("")
    const [time, setTime] = useState("")
    const [address, setAddress] = useState("")
    const [attendees, setAttendees] = useState("")

    // const { session } = useSession() // Clerk session hook

    async function loadEvents() {
        const allEvents = await getEvents()
        if (!date) return
        const selectedDateStr = date.toISOString().split("T")[0]
        const filtered = allEvents.filter(ev => ev.date === selectedDateStr)
        setEvents(filtered)
    }

    useEffect(() => {
        loadEvents()
    }, [date])

    function handleDateSelect(selectedDate: Date | undefined) {
        if (!selectedDate) return
        setDate(selectedDate)
        setModalOpen(true)
    }

    async function handleCreate() {
        if (!date) return
        // if (!session) {
        //     alert("Please login to create event")
        //     return
        // }

        // const token = await session.getToken()

        // if (!token) {
        //     alert("Please login to create event")
        //     return
        // }

        await createEvent(
            {
                title,
                badge,
                date: date?.toISOString().split("T")[0],
                time,
                address,
                attendees
            },
            // token
        )

        // reset form
        setTitle("")
        setBadge("")
        setTime("")
        setAddress("")
        setAttendees("")
        setModalOpen(false)
        loadEvents()
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
                {events.map(ev => <EventCard key={ev.id} event={ev} onChange={loadEvents}/>)}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-full max-w-md space-y-3">
                        <h2 className="text-lg font-semibold">Create Event</h2>
                        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                        <Input placeholder="Badge" value={badge} onChange={e => setBadge(e.target.value)}/>
                        <Input type="time" value={time} onChange={e => setTime(e.target.value)}/>
                        <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
                        <Input placeholder="Attendees" value={attendees} onChange={e => setAttendees(e.target.value)}/>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreate}>Create</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
