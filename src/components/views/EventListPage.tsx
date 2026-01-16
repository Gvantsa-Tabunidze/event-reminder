import { EventCard } from "@/components/views/EventCard"
import { useEvents } from "@/store/events/hooks/EventsContextHook"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export function EventListPage() {
    const {events} = useEvents()
    const location = useLocation();
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const navigate =  useNavigate()

useEffect(() => {
  const scrollToEventId = (location.state as any)?.scrollToEventId;
  if(!events.length) return
  if (!scrollToEventId) return;
    const el = document.getElementById(scrollToEventId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(scrollToEventId);
      navigate(location.pathname,{replace:true, state:{}})

    }
}, [location.state, events.length, location.pathname, navigate]);

// 2. EFFECT: Handle the Timer separately
    // This effect ONLY cares about when highlightedId changes.
    // It is not affected by the router navigation.
    useEffect(() => {
        if (!highlightedId) return;

        const timerId = setTimeout(() => {
            setHighlightedId(null);
        }, 2000);

        return () => clearTimeout(timerId);
    }, [highlightedId]);
  
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">All Events</h2>
            {events.map(ev => <EventCard key={ev.id} event={ev} id={ev.id} highlight={highlightedId === ev.id} />)}
        </div>
    )
}
