
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
    data:EventItem[] 
    error?:any
}


export interface Notification{
    id:string,
    event_id?:string,
    user_id?:string,
    notify_at?:string,
    is_sent?:boolean,
    is_read: boolean,
    title:string
}

export interface NotificationResponse {
    success:boolean,
    data:Notification[] ,
    error?:any
}

