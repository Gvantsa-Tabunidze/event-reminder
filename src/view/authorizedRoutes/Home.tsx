import UpcomingEvents from "@/components/UpcomingEvents.tsx";
import {DatePicker} from "@/components/DatePicker.tsx";

const Home = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 py-6 px-6">
            <UpcomingEvents/>
            <DatePicker/>
        </div>
    )
}
export default Home
