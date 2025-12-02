import { useState } from "react"
import type { EventItem } from "@/api/type.ts"
import { deleteEvent } from "@/api/index.ts"
import { Button } from "@/components/ui/button"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { EditEventModal } from "./EditEventModal"

interface Props {
    event: EventItem
    // onChange: () => void
}

export function EventCard({ event }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    async function remove() {
        await deleteEvent(event.id)
    }

    return (
        <>
            <Item className="items-start" variant="outline">
                <ItemMedia className="bg-blue-500 text-white p-2 rounded-lg">
                    <Calendar />
                </ItemMedia>
                <ItemContent className="gap-2">
                    <ItemTitle>{event.title}</ItemTitle>
                    {event.badge && <Badge>{event.badge}</Badge>}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2"><Calendar size={16}/> {event.date}</div>
                        <div className="flex items-center gap-2"><Clock size={16}/> {event.time}</div>
                        <div className="flex items-center gap-2"><MapPin size={16}/> {event.address}</div>
                        <div className="flex items-center gap-2"><Users size={16}/> {event.attendees}</div>
                    </div>
                </ItemContent>
                <ItemActions>
                    <Button size="sm" onClick={() => setEditOpen(true)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={remove}>Delete</Button>
                </ItemActions>
            </Item>
            <EditEventModal open={editOpen} onClose={() => setEditOpen(false)} event={event} />
        </>
    )
}
