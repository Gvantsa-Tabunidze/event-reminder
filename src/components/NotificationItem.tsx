import {type Notification} from "../api/type"

interface NotifItemProps {
  notification: Notification;
  toggleRead: (id:string) => void;
}

const NotificationItem = ({ notification, toggleRead }: NotifItemProps) => (
  <div className="p-2 cursor-pointer flex items-center"
    onClick={()=>toggleRead(notification.id)}>
    <p className="text-sm text-[var(--color-primary)] w-full">{notification.title}</p>
    {!notification.is_read && <div className="bg-red-400 h-2 w-2 rounded-full"></div>}
  </div>
    
);

export  default NotificationItem