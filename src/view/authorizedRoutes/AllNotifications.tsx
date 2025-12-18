import useNotifications from "@/store/notifications/hooks/useNotifications"
import NotificationItem from "../../components/NotificationItem"

const AllNotifications = () => {
    const {notifications}= useNotifications()

  return (
    <div>{notifications?.map((n)=>(<NotificationItem key={n.id} notification={n} />))}</div>
  )
}

export default AllNotifications