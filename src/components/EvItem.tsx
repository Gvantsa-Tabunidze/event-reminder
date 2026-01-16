import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"
import { Link } from "react-router-dom"
import {type EventItem} from "../api/type"

interface EventItemProps{
    event:EventItem
}
const EvItem = ({event}:EventItemProps) => {
  const {title,date,time}=  event
  return (
    <Link to="/events" state={{ scrollToEventId: event.id }} className="text-foreground">
        <Item variant="default" className="p-2">
          <ItemContent>
            <ItemTitle>{`"${title}"`}</ItemTitle>
          </ItemContent>
          <ItemDescription className="flex gap-2">
              <small className="text-secondary">{date}</small>
              <small className="text-secondary">{time}</small>
          </ItemDescription>
        </Item>
    </Link>
  )
}

export default EvItem