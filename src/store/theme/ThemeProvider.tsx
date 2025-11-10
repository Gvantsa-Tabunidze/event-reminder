import {createContext, useContext} from "react";
import type {Theme} from "./types/theme.ts";
import {type ThemeProvider, useTheme} from "./hooks/useTheme.ts"



export interface ThemeProviderState {
    theme: Theme,
    setTheme: (theme: Theme) => void,
}
interface ThemeProviderProps extends ThemeProvider {
    children: React.ReactNode,
}



//Initial State
const initialState: ThemeProviderState = {
    theme: "light",
    setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
                           children,
                           defaultTheme="light",
                           storageKey = "vite-ui-theme",
                           ...props
                       }: ThemeProviderProps) {


    const themeHook = useTheme({defaultTheme, storageKey})

    return (
        <ThemeProviderContext.Provider {...props} value={themeHook.value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}



export const useThemeContext = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within ThemeProvider");
    return context
}

