import { Event } from "react-big-calendar";
import calendarApi from "../api/calendarApi";


const createEvent = async (calendarEvent: Event): Promise<Event> => {
    const { data } = await calendarApi.post("/events", calendarEvent);

    return data.event;
}

const updateEvent = async (calendarEvent: Event): Promise<Event> => {
    const { data } = await calendarApi.put(`/events/${calendarEvent.resource.id}`, calendarEvent);

    return data.event;
}

const deleteEvent = async (calendarEvent: Event): Promise<void> => {
    await calendarApi.delete(`/events/${calendarEvent.resource.id}`);
}

const getEvents = async (): Promise<Event[]> => {
    const { data } = await calendarApi.get("/events");
    return data.events;
}

export { createEvent, updateEvent, deleteEvent, getEvents }