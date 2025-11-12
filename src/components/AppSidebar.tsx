import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Bell, LayoutDashboard, List} from "lucide-react";


const items = [
    {
        title: "Home",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "All notifications",
        url: "#",
        icon: Bell,
    },
    {
        title: "All events",
        url: "#",
        icon: List,
    }
]


const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton>
                                        <a href={item.url} className="flex gap-2">
                                            <item.icon size={16}/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}
export default AppSidebar
