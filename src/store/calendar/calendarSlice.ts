import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { Event } from "react-big-calendar";

const tempEvent: Event =
{
    title: 'All Day Event very long title',
    start: new Date(),
    end: addHours(new Date(), 4),
    resource: {
        __id: new Date().getTime(),
        user: {
            __id: '1',
            name: 'Darwin Ruiz',
        },
        notes: 'This is a note',
    },
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action): void => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action): void => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action): void => {
            const index = state.events.findIndex(event => event.resource.__id === action.payload.resource.__id);
            state.events[index] = action.payload;
            state.activeEvent = null;
        },
        onDeleteEvent: (state): void => {
            if (!state.activeEvent) return
            const calendarEventActive: Record<string, any> = state.activeEvent;
            state.events = state.events.filter(event => event.resource.__id !== calendarEventActive.resource.__id);
            state.activeEvent = null;
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;