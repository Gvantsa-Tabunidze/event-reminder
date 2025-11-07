import {MoonIcon, SunIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useTheme} from "@/store/theme/ThemeProvider.tsx";

const ModeToggle = () => {
    const {theme, setTheme} = useTheme()
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
