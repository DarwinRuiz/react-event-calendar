import { Event } from "react-big-calendar";

export interface CalendarInitialState {
    events: Event[];
    activeEvent: Event | null;
}