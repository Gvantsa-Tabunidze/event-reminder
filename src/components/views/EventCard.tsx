import { useState } from "react"
import type { EventItem } from "@/api/type.ts"
import { Button } from "@/components/ui/button"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import {useEvents} from "@/store/events/hooks/EventsContextHook"
import { EditEventModal } from "./EditEventModal"
import { Trash } from "lucide-react"
import { Pencil } from "lucide-react"


interface Props {
    event: EventItem
    highlight:boolean
    id?:string
}


export function EventCard({ event, highlight, id }: Props) {
    const {deleteEvent} = useEvents()
    const [editOpen, setEditOpen] = useState(false)

    return (
        <div id={id} className={`${highlight ? "bg-pink-100" : ""} hover:shadow-md rounded-md`}>
            <Item className="items-start" variant="outline">
                <ItemMedia className="bg-pink-900 text-white p-2 rounded-lg">
                    <Calendar />
                </ItemMedia>
                <ItemContent className="gap-2">
                    <ItemTitle>{event.title}</ItemTitle>
                    {event.badge && <Badge className="bg-muted-foreground text-secondary border-slate-400">{event.badge}</Badge>}
                    <div className="grid grid-cols-2 gap-4 text-secondary">
                        <div className="flex items-center gap-2"><Calendar size={16}/> {event.date?.split('T')[0]}</div>
                        <div className="flex items-center gap-2"><Clock size={16}/> {event.date?.split('T')[1].slice(0,5)}</div>
                        <div className="flex items-center gap-2"><MapPin size={16}/> {event.address}</div>
                        <div className="flex items-center gap-2"><Users size={16}/> {event.attendees?.join(",")}</div>
                    </div>
                </ItemContent>
                <ItemActions className="gap-0">
                    <Button size="icon" variant="ghost" onClick={() => setEditOpen(true)} className="text-foreground hover:text-foreground"><Pencil /></Button>
                    <Button size="icon" variant="ghost" onClick={()=>deleteEvent(event.id)}><Trash /></Button>
                </ItemActions>
            </Item>
           {editOpen && <EditEventModal event={event} onClose={()=>{setEditOpen(false)}}/>}
        </div>
    )
}
