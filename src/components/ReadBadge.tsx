import { type Notification } from "@/api/type"
interface ReadBadgeProps {
  toggleRead:(notificationId:string)=>void
  notification:Notification
}

const ReadBadge = ({toggleRead, notification}:ReadBadgeProps) => {
  return (
    <button type="button" aria-label="Mark notification as read" className="flex w-8 h-8 items-center justify-center" 
    onClick={(e)=> {
      e.stopPropagation();
      e.preventDefault();
      toggleRead(notification.id)
      }}>
        <div className="bg-destructive h-2 w-2 rounded-full"></div>
      </button>
  )
}

export default ReadBadge