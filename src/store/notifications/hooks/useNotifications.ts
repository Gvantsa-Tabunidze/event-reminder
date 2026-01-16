import { useContext } from "react";
import {NotificationContext} from "../NotificationContext"
import type { INotificationsType } from "../types/CntxtValueType";

function useNotifications() : INotificationsType {
    const notificationsContext = useContext(NotificationContext)
    if(!notificationsContext){
        throw new Error("useNotifications must be used within an NotificationsContextProvider")
    }
    return notificationsContext
}

export default useNotifications