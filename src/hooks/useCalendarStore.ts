import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Event } from "react-big-calendar"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import Swal from "sweetalert2"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import { createEvent, deleteEvent, getEvents, updateEvent } from "../services/calendarService"

export const useCalendarStore = (): Record<string, any> => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar)
    const { user } = useSelector((state: RootState) => state.auth)

    const hasEventSelected = activeEvent !== null


    const activeEventForValidation = activeEvent !== null ? structuredClone(activeEvent) as Record<string, any> : null
    const hasEventSelectedWithId = activeEventForValidation !== null ? !!activeEventForValidation.resource.id : false


    const setActiveEvent = (calendarEvent: Event): void => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent: Event): Promise<void> => {
        try {
            if (calendarEvent.resource.id) {
                await updateEvent(calendarEvent);

                dispatch(onUpdateEvent({ ...calendarEvent, resource: { ...calendarEvent.resource, user } }));
            } else {

                const event = await createEvent({ ...calendarEvent, resource: { ...calendarEvent.resource, user } });

                dispatch(onAddNewEvent({ ...calendarEvent, resource: { ...calendarEvent.resource, id: event.resource.id, user } }));
            }
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    const startDeletingEvent = async (): Promise<void> => {

        if (!activeEvent) return;

        try {
            await deleteEvent(activeEvent);

            dispatch(onDeleteEvent());
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    const startLoadingEvents = async (): Promise<void> => {
        try {
            const data = await getEvents();

            const events = convertEventsToDateEvents(data);
            dispatch(onLoadEvents(events));
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error')
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected,
        hasEventSelectedWithId,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}