import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from "@/store/theme/ThemeProvider.tsx";
import {AuthContextProvider} from "@/store/auth/AuthContextProvider.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </StrictMode>,
)
