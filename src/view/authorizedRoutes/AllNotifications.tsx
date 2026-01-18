import useNotifications from "@/store/notifications/hooks/useNotifications"
import NotificationItem from "../../components/NotificationItem"
import { Button } from "@/components/ui/button"

const AllNotifications = () => {
    const {notifications, toggleToRead, markAllAsRead}= useNotifications()

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button onClick={markAllAsRead} variant="link" className="font-extralight text-secondary">{notifications?.some((n)=>!n.is_read) ? "Read all" : "Unread all"}</Button>
      </div>
     
      <div>{notifications?.map((n)=>(<NotificationItem key={n.id} notification={n} toggleRead={toggleToRead}/>))}</div>
    </div>
  )
    
}

export default AllNotifications