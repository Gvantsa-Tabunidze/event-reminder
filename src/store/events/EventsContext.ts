import {createContext} from "react";
import type { IEventsContext } from "./types/EventsValueContext";


export const EventsContext = createContext<IEventsContext | undefined>(undefined)

