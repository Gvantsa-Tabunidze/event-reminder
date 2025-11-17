import UpcomingEvents from "@/components/UpcomingEvents.tsx";
import {CalendarPage} from "@/components/views/CalendarPage.tsx";

const Home = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 py-6 px-6">
            <UpcomingEvents/>
            <CalendarPage/>
        </div>
    )
}
export default Home
