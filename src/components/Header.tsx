import {Link} from "react-router-dom";
import {UserButton} from "@clerk/clerk-react";
import ModeToggle from "@/components/ModeToggle.tsx";
import Notification from "@/components/Notification.tsx";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";

const Header = () => {


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
                    </div>

                    <UserButton/>
                </div>
            </nav>
        </div>

    )
}
export default Header
