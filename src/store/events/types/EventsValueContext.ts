import { type EventItem } from "@/api/type";
import {type EventsResponse} from "@/api/type"


export interface IEventsContext {
  events: EventItem[]
  getEvents: (upcomingOnly?: boolean, limit?: number) => Promise<EventsResponse>
  createEvent: (event: Partial<EventItem>) => Promise<EventsResponse>
  updateEvent: (id: string, updates: Partial<EventItem>) => Promise<EventsResponse>
  deleteEvent: (id: string) => Promise<EventsResponse>
}