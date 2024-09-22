import { Event } from "react-big-calendar";

export interface CalendarInitialState {
    isLoadingEvents: boolean;
    events: Event[];
    activeEvent: Event | null;
}