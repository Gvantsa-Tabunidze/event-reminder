import { useContext } from "react"
import { EventsContext } from "../EventsContext"


export function useEvents() {
  const Evntcontext = useContext(EventsContext)
  
  if (Evntcontext === undefined) {
    throw new Error("useEvents must be used within an EventsContextProvider")
  }
  
  return Evntcontext
}