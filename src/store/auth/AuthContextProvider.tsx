import {useEffect, useState} from "react";
import {supabase} from "@/api/supabaseClient.ts";
import {type Session} from "@supabase/supabase-js";
import {AuthContext} from "./AuthContext";
import type {AuthResponse} from "./types/signInSupabaseType.ts";


interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthContextProvider = ({children}: IAuthProviderProps) => {
    const [authSession, setAuthSession] = useState<Session | null>(null);
    console.log(authSession)

    //Sign up new user
    const signUpNewUser = async ({email, password, name}: { email: string, password: string, name?: string }) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    ...(name ? {name} : {})
                }
            }
        });
        if (error) {
            console.error("There was a problem signing up:", error)
            return {success: false, error}
        }
        console.log(data)
        return {success: true, data}
    }

    //Sign in
    const signInUser = async ({email, password}: { email: string, password: string }): Promise<AuthResponse> => {
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
        } catch (err) {
            console.error("There was a problemsigning up:", err)
            return {success: false, error: undefined};
        }
    }

    //Listen to state in AuthState change
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            console.log("Initial session:", session);
            setAuthSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth state changed:", session);
            setAuthSession(session)
        })
    }, [])

    //Sign Out
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) throw new Error(error.message)
    }

    return (
        <AuthContext.Provider value={{authSession, signUpNewUser, signOut, signInUser, setAuthSession}}>
            {children}
        </AuthContext.Provider>
    )
}
