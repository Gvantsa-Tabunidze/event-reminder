import {useContext} from "react";
import {ThemeProviderContext} from "@/store/theme/ThemeProvider.tsx";


export const useThemeContext = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) throw new Error("useTheme must be used within ThemeProvider");
	return context
}