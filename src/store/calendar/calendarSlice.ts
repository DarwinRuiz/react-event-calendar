import { createSlice } from "@reduxjs/toolkit";

import { CalendarInitialState } from "../interfaces/calendarInitialState";
import { Event } from "react-big-calendar";

const initialState: CalendarInitialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, action): void => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action): void => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action): void => {
            const index = state.events.findIndex(event => event.resource.id === action.payload.resource.id);
            state.events[index] = action.payload;
            state.activeEvent = null;
        },
        onDeleteEvent: (state): void => {
            if (!state.activeEvent) return
            const calendarEventActive: Record<string, any> = state.activeEvent;
            state.events = state.events.filter(event => event.resource.id !== calendarEventActive.resource.id);
            state.activeEvent = null;
        },
        onLoadEvents: (state, action): void => {
            state.isLoadingEvents = false;
            action.payload.forEach((event: Event) => {
                const exists = state.events.some((dbEvent: Event) => dbEvent.resource.id === event.resource.id);

                if (!exists) {
                    state.events.push(event);
                }
            })
        },
        onClearEvents: (state): void => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onClearEvents } = calendarSlice.actions;