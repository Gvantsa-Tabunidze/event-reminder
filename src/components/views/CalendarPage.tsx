import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import  {EventModal}  from "../EventModal"
import { Button } from "@/components/ui/button"
import { useEvents } from "@/store/events/hooks/EventsContextHook"
import { useMemo } from "react"
import EvItem from "../EvItem"


export function CalendarPage() {
    const {events} = useEvents()
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [modalOpen, setModalOpen] = useState(false)



   const filteredEvents = useMemo(()=>{
    if(!date) return []
    const selectedDate =  date.toLocaleDateString("en-CA")
    return events.filter((ev)=>(ev.date === selectedDate))
   }, [date, events])

    function handleDateSelect(selectedDate: Date | undefined) {
        if (!selectedDate) return
        setDate(selectedDate)
        
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">
                {date ? date.toLocaleString("default", {month: "long", year: "numeric"}) : ""}
            </h2>
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                />
                <div className="mt-4">
                    <Button size="sm" className="w-auto" onClick={() => setModalOpen(true)}> Add Event </Button>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
            {filteredEvents.length === 0 && <p>No events on this date.</p>}
            {filteredEvents.map(ev => <EvItem key={ev.id} event={ev}/>)}
            </div>
            {modalOpen && <EventModal onClose={()=>{
                setModalOpen(false)
                }}/>}
        </div>
    )
}


