import  {EventsContext} from "@/store/events/EventsContext"
import type { EventItem } from "@/api/type";
import {supabase} from "@/api/supabaseClient.ts";
import {useState} from "react";
import {type IEventsContextChildren} from "./types/EventsContextChildren"
import {type EventsResponse} from "@/api/type"


export function EventsContextProvider({children}:IEventsContextChildren) {
const [events, setEvents] = useState<EventItem[]>([])


async function getEvents(): Promise<EventsResponse> {
   try {
     const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true })
    if (error) throw error
    setEvents(data)
    return {success:true, data:data}
   
   } catch (error) {
    console.log(error)
    return {success:false, error, data:[]}
   }
}

async function createEvent(event: Partial<EventItem>) : Promise<EventsResponse> {
    try {
        const {data:{session}} = await supabase.auth.getSession()
        if(!session) throw new Error("Not authorized")
        const user_id = session.user.id

        const {data, error} = await supabase
        .from("events")
        .insert({
           ...event,
           user_id
        })
        .select("*")
        if (error) throw error
        if(data.length > 0){
            console.log(data)
            const createdEvent = data[0]
            setEvents(prev => [...prev, createdEvent]);
            //Calculate noticiation time
            if(createdEvent.date){
                const eventDate = new Date(createdEvent.date);
                const notifyAt = new Date(eventDate);
                notifyAt.setDate(eventDate.getDate() - 1);
                notifyAt.setHours(12, 0, 0, 0); 
            //Insert into notifications table
            await supabase.from("push_notifications").insert({
            event_id: createdEvent.id,
            title:createdEvent.title,
            user_id,
            notify_at: new Date().toISOString(),
            is_sent: false
        });
            }
        }

        // Trigger edge function to send push notifications
        try {
          await fetch("https://quqwekpgxizfxvhdzbbx.functions.supabase.co/send-reminders", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`,
              "Content-Type": "application/json"
            }
          });
          console.log("Edge function triggered successfully");
        } catch (err) {
          console.error("Failed to trigger edge function:", err);
        }
      
        return {success:true, data:data ?? []}
    } catch (error) {
        return {success:false, error, data:[]}
    }
}




async function updateEvent(id: string, updates: Partial<EventItem>) : Promise<EventsResponse> {
    try {
    const { error, data } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select("*")  
    if (error) throw error
    if(data! && data.length > 0){
        const updatedevent = data[0]
        setEvents(prev => prev.map((event)=>(event.id === id ? {...event, ...updatedevent} : event) ))
        //Calculate noticiation time
            if(updatedevent.date){
                const eventDate = new Date(updatedevent.date);
                const notifyAt = new Date(eventDate);
                notifyAt.setDate(eventDate.getDate() - 1);
            //Insert into notifications table
            await supabase.from("push_notifications")
            .update({
            notify_at: notifyAt.toISOString(),
            is_sent: false
            })
            .eq("event_id", id);
            }
    }

    
        // Trigger edge function to send push notifications
        try {
          await fetch("https://quqwekpgxizfxvhdzbbx.functions.supabase.co/send-reminders", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`,
              "Content-Type": "application/json"
            }
          });
          console.log("Edge function triggered successfully");
        } catch (err) {
          console.error("Failed to trigger edge function:", err);
        }
      
    return { success: true, data: data ?? [] }
    } catch (error) {
    console.log(error)
    return { success: false, error, data: [] }
    }
}






async function deleteEvent(id: string) : Promise<EventsResponse> {
try {
    const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    if (error) throw error
    setEvents(prev => prev.filter(event => event.id !== id))
    return {success:true, data:[]}
} catch (error) {
    console.log(error)
    return { success: false, error, data: [] }
}
}  
  return (
   <EventsContext.Provider value={{events, getEvents, createEvent, updateEvent, deleteEvent}}>
    {children}
   </EventsContext.Provider>
  );
}