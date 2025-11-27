import './App.css'
import { Route, Routes } from "react-router-dom"
import MainPage from "@/view/authorizedRoutes/MainPage.tsx"
import Authorization from "@/view/unauthorizedRoutes/Authorization.tsx"
import Home from "@/view/authorizedRoutes/Home.tsx"
import { EventListPage } from "@/components/views/EventListPage.tsx"
import SignIn from "@/components/SignIn.tsx";
import SignUp from "@/components/SignUp.tsx";

function App() {
    return (
        <Routes>
            {/* Public route */}
            <Route element={<Authorization />}>
                <Route  path="/sign-in" element={<SignIn/>}/>
                <Route  path="/sign-up" element={<SignUp/>}/>
            </Route>

            {/* Protected layout */}
            <Route element={<MainPage />}>
                <Route index element={<Home />} />
                {/*<Route path="calendar" element={<CalendarPage />} />*/}
                <Route path="events" element={<EventListPage />} />
            </Route>
        </Routes>
    )
}

export default App
