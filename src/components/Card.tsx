import {Calendar, Clock, Ellipsis, MapPin, Users} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle,} from "@/components/ui/item"
import {Badge} from "@/components/ui/badge"

export function Card() {
    return (
        <div className="flex w-full max-w-lg flex-col gap-6">
            <Item className="items-start" variant="outline">
                <ItemMedia className="bg-blue-500 text-white p-2 rounded-lg" variant="default">
                    <Calendar/>
                </ItemMedia>
                <ItemContent className="gap-2">
                    <ItemTitle>Event name</ItemTitle>
                    <Badge variant="secondary">Badge</Badge>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <Calendar size={16}/>
                            Date
                        </div>
                        <div className="flex items-start gap-2">
                            <Clock size={16}/>
                            Time
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin size={16}/>
                            Address
                        </div>
                        <div className="flex items-start gap-2">
                            <Users size={16}/>
                            Attendees
                        </div>
                    </div>
                </ItemContent>
                <ItemActions>
                    <Button size="sm" variant="ghost">
                        <Ellipsis/>
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )
}
