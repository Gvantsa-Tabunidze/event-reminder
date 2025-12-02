export interface EventItem {
    id: string
    user_id: string
    title: string
    badge?: string
    date?: string
    time?: string
    address?: string
    attendees?: string[]
    created_at?: string
}

export interface EventsResponse {
    success:boolean,
    data?:EventItem[] 
    error?:any
}

