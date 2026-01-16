
import Upcomingevents from "../../components/Upcomingevents"
import { CalendarPage } from "@/components/views/CalendarPage";

const Home = () => {

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 py-6 px-6">
            <Upcomingevents/>
            <CalendarPage/>
        </div>
    )
}
export default Home
