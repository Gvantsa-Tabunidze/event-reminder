import {createContext} from "react";
import type {IAuthContext} from "@/store/auth/types/authContextInterface.ts";

export const AuthContext = createContext<IAuthContext | null>(null)
