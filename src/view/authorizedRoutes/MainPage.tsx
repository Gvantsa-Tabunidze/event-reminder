import {Outlet} from 'react-router-dom'
import Header from "@/components/Header.tsx";
import {SidebarProvider} from '@/components/ui/sidebar';
import AppSidebar from "@/components/AppSidebar.tsx";
import { useEffect } from "react";
import { registerPush } from "../../services/push";

const MainPage = () => {
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  useEffect(() => {
    registerPush(VAPID_PUBLIC_KEY).catch((err)=>console.log(err))
  }, []);

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
