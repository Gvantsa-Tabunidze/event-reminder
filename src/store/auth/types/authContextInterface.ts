import type {AuthError, Session, User} from "@supabase/supabase-js";

export interface IAuthContext {
    authSession: Session | null
    setAuthSession: (session: Session | null) => void
    signUpNewUser: (params: { email: string, password: string, name?: string }) => Promise<{
        success: boolean;
        data?: {
            user: User | null;
            session: Session | null;
        };
        error?: AuthError
    }>
    signInUser: (params: { email: string, password: string }) => Promise<{
        success: boolean;
        data?: {
            user: User | null;
            session: Session | null;
        };
        error?: AuthError
    }>
    signOut: () => Promise<void>
    loading:boolean
}