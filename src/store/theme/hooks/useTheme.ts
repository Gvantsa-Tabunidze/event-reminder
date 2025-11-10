import {useEffect, useState} from "react";
import type {Theme} from "../types/theme.ts"


export interface ThemeProvider{
	defaultTheme: Theme
	storageKey: string
}

export const useTheme=({
   defaultTheme,
   storageKey,
   }:ThemeProvider)=>{

	const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme ) || defaultTheme)

	useEffect(() => {
		const root = window.document.documentElement
		// Remove both possible classes before applying the current one
		root.classList.remove("light", "dark")
		root.classList.add(theme)
	}, [theme]);


	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme)
		}
	}

	return {
		value
	}
}
