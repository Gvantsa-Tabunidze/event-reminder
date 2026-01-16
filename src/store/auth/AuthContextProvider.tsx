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
    const [loading, setLoading] = useState(true)


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
        if (data?.session) setAuthSession(data.session); 
        console.log(data)
        return error ? {success: false, error} : {success: true, data};      
    }

    //Sign in
    const signInUser = async ({email, password}: { email: string, password: string }): Promise<AuthResponse> => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (data?.session) setAuthSession(data.session); 
            console.log("sign in was successful", data)
            return error ? {success: false, error} : {success: true, data};
        } catch (err) {
            console.error("There was a problemsigning up:", err)
            return {success: false, error: undefined};
        }
    }

    // Load session + subscribe
    useEffect(() => {
        let isMounted = true;
        supabase.auth.getSession().then(({data: {session}}) => {
            if(isMounted) {
                console.log("Initial session:", session);
                setAuthSession(session)
                setLoading(false)
            }
            
        })

        const {data:subscription} = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth state changed:", session);
            if(isMounted){
                setAuthSession(session)
            }
            
        })

        //clean-up
        return()=> {
            isMounted = false
            subscription.subscription.unsubscribe() 
        }
    }, [])

    //Sign Out
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) throw new Error(error.message)
        setAuthSession(null);

    }

    return (
        <AuthContext.Provider value={{authSession, signUpNewUser, signOut, signInUser, setAuthSession, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
