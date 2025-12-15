import {type Notification} from "../api/type"

interface NotifItemProps {
  notification: Notification;
  toggleRead: (id:string) => void;
}

const NotificationItem = ({ notification, toggleRead }: NotifItemProps) => (
  <div
    className={`p-2 border-b last:border-none cursor-pointer ${
      notification.is_read ? "bg-white" : "bg-blue-50"
    }`}
    onClick={()=>toggleRead(notification.id)}
  >
    {notification.title}
  </div>
);

export  default NotificationItem