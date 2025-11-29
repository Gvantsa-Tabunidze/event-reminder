import {useContext} from "react";
import type {IAuthContext} from "@/store/auth/types/authContextInterface.ts";
import {AuthContext} from "@/store/auth/AuthContext.ts";

export const useUserAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useUserAuth must be used within AuthContextProvider")
    }
    return context
}