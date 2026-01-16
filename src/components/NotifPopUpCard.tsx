import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import NotificationBtn from "./NotificationBtn"
import { useState } from "react"
import NotificationItem from "./NotificationItem"
import useNotifications from "../store/notifications/hooks/useNotifications"
import { Badge } from "./ui/badge"


const NotifPopUpCard = () => {
const [isOpen, setIsOpen] = useState(false)
const {toggleToRead,notifications} = useNotifications()


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative inline-flex">
            <PopoverTrigger asChild>
            <NotificationBtn />
            </PopoverTrigger>

            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-num absolute left-5 bottom-5" variant="destructive">
            {notifications?.filter(n => !n.is_read).length}
            </Badge>
        </div>

        <PopoverContent className="w-80">
            {notifications === undefined ? (
            <div>Loading ...</div>
            ) : notifications.length === 0 ? (
            <div>No notifications</div>
            ) : (
            notifications.map(n => (
                <NotificationItem
                key={n.id}
                notification={n}
                toggleRead={toggleToRead}
                />
            ))
            )}
        </PopoverContent>
    </Popover>
  )
}

export default NotifPopUpCard