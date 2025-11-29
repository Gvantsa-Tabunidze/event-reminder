import {Outlet} from 'react-router-dom'
import Header from "@/components/Header.tsx";
import {SidebarProvider} from '@/components/ui/sidebar';
import AppSidebar from "@/components/AppSidebar.tsx";

const MainPage = () => {

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar/>
                <main className="flex-1 flex flex-col">
                    <Header/>
                    <div className="p-4">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default MainPage
