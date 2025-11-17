import { Link } from "react-router-dom"
import { LayoutDashboard, Bell, List } from "lucide-react"

const items = [
    { title: "Home", url: "/", icon: LayoutDashboard },
    { title: "All notifications", url: "/notifications", icon: Bell },
    { title: "All events", url: "/events", icon: List },
]

export default function AppSidebar() {
    return (
        <div className="w-64 bg-gray-100 min-h-screen p-4">
            {items.map(item => (
                <div key={item.title} className="mb-2">
                    <Link to={item.url} className="flex gap-2 items-center text-gray-700 hover:text-blue-500">
                        <item.icon size={16} />
                        <span>{item.title}</span>
                    </Link>
                </div>
            ))}
        </div>
    )
}
