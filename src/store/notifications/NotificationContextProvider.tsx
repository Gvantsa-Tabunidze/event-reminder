import { type NotificationContextChildren } from "./types/NotificationCntxtChildren.ts"
import {type Notification} from "../../api/type.ts"
import {type NotificationResponse} from "../../api/type.ts"
import { NotificationContext } from "./NotificationContext"
import { useState } from "react"
import { supabase } from "@/api/supabaseClient.ts"
import { useEffect } from "react"


export const NotificationContextProvider = ({children}:NotificationContextChildren ) => {
const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined)

async function getNotifications() : Promise<NotificationResponse>{
    try {
        const {data:{session}} = await supabase.auth.getSession()
          if(!session) throw new Error("Not authorized")
          const user_id = session.user.id

        const {data, error} = await supabase
        .from("push_notifications")
        .select("*")
        .eq("user_id", user_id )
        .eq("is_sent", true)
        // .eq("is_read", false)
        .order("notify_at", { ascending: false });
        if(error) throw error
        setNotifications(data ?? [])
        return {success:true, data:data}
        
    } catch (error) {
         console.log(error)
    return {success:false, error, data:[]}
    }
}

useEffect(()=>{
   const timeoutId =  setTimeout(()=>{
        getNotifications()
    }, 3000)
    const intervalId = setInterval(()=>{
        getNotifications()
    }, 5*60*1000)
    console.log(notifications)

    return ()=>{
        clearTimeout(timeoutId)
        clearInterval(intervalId)
    }
},[])



async function toggleToRead(notificationId:string) : Promise<void> {
try {
  const notification = notifications?.find(n => n.id === notificationId)
  if (!notification) return
    const newState = !notification.is_read
    const {error} = await supabase
  .from("push_notifications")
  .update({is_read:newState})
  .eq("id", notificationId)
  if (error) throw error
  setNotifications(prev => prev?.map((ntf)=>ntf.id === notificationId ? {...ntf, is_read:newState} : ntf))
} catch (error) {
    console.error("Failed to mark notification as read", error)
    throw error
}
}

//Mark all as read
async function markAllAsRead() : Promise<void> {
  try {
    if (!notifications || notifications.length === 0) return
    const shouldMarkRead = notifications.some(n => !n.is_read)
const {error} = await supabase
.from("push_notifications") 
.update({is_read:shouldMarkRead})
.in("id", notifications.map(n => n.id))
  if (error) throw error
   setNotifications(prev =>
      prev?.map(n => ({ ...n, is_read: shouldMarkRead }))
    )
  } catch (error) {
    console.error("Failed to mark all as read", error)
    throw error
  }
}

  return (
   <NotificationContext.Provider value={{getNotifications, notifications, toggleToRead, markAllAsRead}}>
        {children}
   </NotificationContext.Provider>
  )
}
