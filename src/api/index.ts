import { supabase } from "./supabaseClient"
import type { EventItem } from "@/api/type.ts"


export async function getEvents(): Promise<EventItem[]> {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
    if (error) throw error
    return data as EventItem[]
}
//  token: string
export async function createEvent(event: Partial<EventItem>) {
    // if (!token) throw new Error("Not logged in")

    const res = await fetch("https://<YOUR_SUPABASE_URL>/rest/v1/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": "<YOUR_SUPABASE_ANON_KEY>",
            // "Authorization": `Bearer ${token}` // Clerk JWT
        },
        body: JSON.stringify(event)
    })

    if (!res.ok) {
        const errText = await res.text()
        throw new Error(`Failed to create event: ${errText}`)
    }

    return res.json()
}

export async function updateEvent(id: string, updates: Partial<EventItem>) {
    const { error } = await supabase.from("events").update(updates).eq("id", id)
    if (error) throw error
}

export async function deleteEvent(id: string) {
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) throw error
}
