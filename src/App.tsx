import './App.css'
import { Route, Routes } from "react-router-dom"
import MainPage from "@/view/authorizedRoutes/MainPage.tsx"
import Authorization from "@/view/unauthorizedRoutes/Authorization.tsx"
import Home from "@/view/authorizedRoutes/Home.tsx"
import { CalendarPage } from "@/components/views/CalendarPage.tsx"
import { EventListPage } from "@/components/views/EventListPage.tsx"

function App() {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/authorization" element={<Authorization />} />

            {/* Protected layout */}
            <Route element={<MainPage />}>
                <Route index element={<Home />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="events" element={<EventListPage />} />
            </Route>
        </Routes>
    )
}

export default App
