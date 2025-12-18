import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"
import { Link } from "react-router-dom"
import {type EventItem} from "../api/type"

interface EventItemProps{
    event:EventItem
}
const EvItem = ({event}:EventItemProps) => {
  const {title,date,time}=  event
  return (
    <Link to={`${event.id}`}>
        <Item variant="default" className="p-2">
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
          </ItemContent>
          <ItemDescription className="flex gap-2">
              <small>{date}</small>
              <small>{time}</small>
          </ItemDescription>
        </Item>
    </Link>
  )
}

export default EvItem