import { useState, useEffect } from "react"
import type { EventItem } from "@/api/type.ts"
import { updateEvent } from "@/api/index.ts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
    open: boolean
    onClose: () => void
    event: EventItem
    onUpdated: () => void
}

export function EditEventModal({ open, onClose, event, onUpdated }: Props) {
    const [title, setTitle] = useState(event.title || "")
    const [badge, setBadge] = useState(event.badge || "")
    const [date, setDate] = useState(event.date || "")
    const [time, setTime] = useState(event.time || "")
    const [address, setAddress] = useState(event.address || "")
    const [attendees, setAttendees] = useState(event.attendees || "")

    useEffect(() => {
        setTitle(event.title || "")
        setBadge(event.badge || "")
        setDate(event.date || "")
        setTime(event.time || "")
        setAddress(event.address || "")
        setAttendees(event.attendees || "")
    }, [event])

    if (!open) return null

    async function save() {
        await updateEvent(event.id, { title, badge, date, time, address, attendees })
        onUpdated()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-full max-w-md space-y-3">
                <h2 className="text-lg font-semibold">Edit Event</h2>
                <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="Badge" value={badge} onChange={e => setBadge(e.target.value)} />
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
                <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                <Input placeholder="Attendees" value={attendees} onChange={e => setAttendees(e.target.value)} />
                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                </div>
            </div>
        </div>
    )
}
