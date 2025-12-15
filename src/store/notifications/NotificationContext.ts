import {createContext} from "react";
import type { INotificationsType } from "./types/CntxtValueType.ts";


export const NotificationContext = createContext<INotificationsType | undefined>(undefined)

