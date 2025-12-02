import {Link, useNavigate} from "react-router-dom";
import ModeToggle from "@/components/ModeToggle.tsx";
import Notification from "@/components/Notification.tsx";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {useUserAuth} from "@/store/auth/hooks/useUserAuth.ts";
import SignOutButton from "@/components/SignOut.tsx";
import {useEffect} from "react";


const Header = () => {
    const {authSession, loading} = useUserAuth()
   

    const navigate = useNavigate()
    useEffect(() => {
        if (!authSession && !loading) {
            navigate("/sign-up")
        }
    }, [authSession, navigate])


    return (
        <div className="flex">
            <SidebarTrigger/>
            <nav
                className="sticky top-0 w-full border-b bg-background/95 z-50 flex items-center justify-between px-40 py-2">
                <Link to="/">Logo</Link>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-start gap-2">
                        <Notification/>
                        <ModeToggle/>
                        <SignOutButton/>
                    </div>
                </div>
            </nav>
        </div>

    )
}
export default Header
