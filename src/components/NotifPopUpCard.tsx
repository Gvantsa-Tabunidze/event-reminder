import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import NotificationBtn from "./NotificationBtn"
import { useEffect, useState } from "react"
import NotificationItem from "./NotificationItem"
import useNotifications from "../store/notifications/hooks/useNotifications"


const NotifPopUpCard = () => {
const [isOpen, setIsOpen] = useState(false)
const {getNotifications,toggleToRead,notifications,markAllAsRead} = useNotifications()
useEffect(()=>{
   const timeoutId =  setTimeout(()=>{
        getNotifications()
    }, 3000)
    const intervalId = setInterval(()=>{
        getNotifications()
    }, 5*60*1000)
    return ()=>{
        clearTimeout(timeoutId)
        clearInterval(intervalId)
    }

},[])


  return (
   <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
            <NotificationBtn  />
        </PopoverTrigger>
        <PopoverContent className="w-80px">
            {notifications === undefined ? (<div>Loading ...</div> )
            :
            notifications.length===0 ? (<div>No notifications</div>)
            :
            notifications?.map((n)=>(<NotificationItem key={n.id} notification={n} toggleRead={toggleToRead}/>))
            }          
        </PopoverContent>
   </Popover>
  )
}

export default NotifPopUpCard