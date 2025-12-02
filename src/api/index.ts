import { supabase } from "./supabaseClient"
import type { EventItem } from "@/api/type.ts"
import {type EventsResponse} from "./type"


export async function getEvents(): Promise<EventsResponse> {
   try {
     const { data, error, status } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true })
    if (error) throw error
    return {success:true, data}
   } catch (error) {
    return {success:false, error}
   }
}



export async function createEvent(event: Partial<EventItem>) {
    
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
        return {success:true, data}
    } catch (error) {
        //Toast here
        return {success:false, error}
    }
}




export async function updateEvent(id: string, updates: Partial<EventItem>) {
    const { error } = await supabase.from("events").update(updates).eq("id", id)
    if (error) throw error
}

export async function deleteEvent(id: string) {
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) throw error
}
