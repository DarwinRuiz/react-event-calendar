import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Event } from "react-big-calendar"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import Swal from "sweetalert2"

export const useCalendarStore = (): Record<string, any> => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar)
    const hasEventSelected = activeEvent !== null


    const activeEventForValidation = activeEvent !== null ? structuredClone(activeEvent) as Record<string, any> : null
    const hasEventSelectedWithId = activeEventForValidation !== null ? !!activeEventForValidation.resource.__id : false


    const setActiveEvent = (calendarEvent: Event): void => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent: Event): Promise<void> => {

        if (calendarEvent.resource.__id) {
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            const newEvent = { ...calendarEvent, resource: { ...calendarEvent.resource, __id: new Date().getTime() } }
            dispatch(onAddNewEvent(newEvent));
        }
    }

    const startDeletingEvent = async (): Promise<void> => {
        const deleteConfirm = await Swal.fire({
            title: "¿Está seguro de eliminar el evento?",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true
        });

        if (!deleteConfirm.isConfirmed) return


        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        hasEventSelected,
        hasEventSelectedWithId,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}