import {Navigate, Outlet} from 'react-router-dom'
import Header from "@/components/Header.tsx";
import {useUser} from "@clerk/clerk-react";
import {SidebarProvider} from '@/components/ui/sidebar';
import AppSidebar from "@/components/AppSidebar.tsx";

const MainPage = () => {
    const {isSignedIn} = useUser()
    if (!isSignedIn) return <Navigate to={"/authorization"} replace={true}/>

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar/>
                <main className="flex-1 flex-col">
                    <Header/>
                    <Outlet/>
                </main>
            </div>
        </SidebarProvider>
    )
}
export default MainPage
