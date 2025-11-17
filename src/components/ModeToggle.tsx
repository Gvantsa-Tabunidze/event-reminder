import {MoonIcon, SunIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useThemeContext} from "@/store/theme/hooks/useThemeContext.ts";

const ModeToggle = () => {
    const {theme,setTheme} = useThemeContext()
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === "light" ? <MoonIcon/> : <SunIcon/>}
        </Button>
    )
}
export default ModeToggle
