import { type Notification } from "@/api/type"
import {type NotificationResponse} from "../../../api/type"

export interface INotificationsType {
    notifications: Notification[] | undefined
    getNotifications:()=> Promise<NotificationResponse>
    toggleToRead:(id:string)=>Promise<void>
    markAllAsRead?: () => Promise<void>
}