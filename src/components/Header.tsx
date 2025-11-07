import {Link} from "react-router-dom";
import {UserButton} from "@clerk/clerk-react";
import ModeToggle from "@/components/ModeToggle.tsx";

const Header = () => {


    return (
        <nav
            className="sticky top-0 w-full border-b bg-background/95 z-50 flex items-center justify-between px-40 py-2">
            <Link to="/">Logo</Link>
            <div className="flex items-center justify-between gap-4">
                <ModeToggle/>
                <UserButton/>
            </div>
        </nav>
    )
}
export default Header
