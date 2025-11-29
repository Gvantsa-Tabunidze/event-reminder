import type {AuthError, Session, User} from "@supabase/supabase-js";

export type AuthResponse = {
    success: boolean;
    data?: { user: User | null; session: Session | null };
    error?: AuthError // catch can throw anything
};