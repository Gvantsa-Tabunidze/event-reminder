import {type Notification} from "../api/type"
import { Link } from "react-router-dom";
import ReadBadge from "./ReadBadge";

interface NotifItemProps {
  notification: Notification;
  toggleRead: (id:string) => void;
  onClick?:(eventId:string)=>void
}

const NotificationItem = ({ notification, toggleRead }: NotifItemProps) => {

  return (
    <Link to="/events" state={{ scrollToEventId: notification.event_id }}>
          <div className="p-2 cursor-pointer flex items-center">
            <p className="text-sm text-[var(--color-primary)] w-full">{notification.title}</p>
            {!notification.is_read && <ReadBadge toggleRead={toggleRead} notification={notification}/>}
          </div>
      </Link>
  )
 
}

export  default NotificationItem