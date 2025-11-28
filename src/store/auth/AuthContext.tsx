import {createContext, useContext, useEffect, useState} from "react";
import {supabase} from "@/api/supabaseClient.ts";

interface IAuthContext {
    session: string | null
    setSession?: (session: string | null) => void
    signUpNewUser?: (name: string, email: string, password: string) => Promise<void>
}

interface IAuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({children}: IAuthProviderProps) => {
    const [session, setSession] = useState<string | null>(null);

    //Sign up new user
    const signUpNewUser = async ({email, password}) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name
                }
            }
        });
        if (error) {
            console.error("There was a problemsigning up:", error)
            return {success: false, error}
        }
        return {success: true, data}
    }

    //Sign in
    const signInUser = async ({email, password}) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (error) {
                console.error("Sign in error occurred:", error.message)
                return {success: false, error}
            }
            console.log("sign in was successful", data)
            return {success: true, data}
        } catch (error) {
            console.error("There was a problemsigning up:", error)
        }
    }

    //Listen to state changes in Supabase
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    //Sign Out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if (error) console.error("There was an error:", error)
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signOut, signInUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(AuthContext);
}