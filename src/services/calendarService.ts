import { Event } from "react-big-calendar";

const createEvent = async (calendarEvent: Event): Promise<Event> => {

    const eventsLocalStorage = localStorage.getItem("events");
    const events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];

    const newEvent = { ...calendarEvent, resource: { ...calendarEvent.resource, id: new Date().getTime() } }

    events.push(newEvent);

    localStorage.setItem("events", JSON.stringify(events));

    return newEvent;
}

const updateEvent = async (calendarEvent: Event): Promise<Event> => {
    const eventsLocalStorage = localStorage.getItem("events");
    const events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];

    const updatedEvents = events.map((event: Event) => {
        if (event.resource.id === calendarEvent.resource.id) {
            return calendarEvent;
        }
        return event;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    return calendarEvent;
}

const deleteEvent = async (calendarEvent: Event): Promise<void> => {
    const eventsLocalStorage = localStorage.getItem("events");
    const events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];

    const updatedEvents = events.filter((event: Event) => event.resource.id !== calendarEvent.resource.id);

    localStorage.setItem("events", JSON.stringify(updatedEvents));
}

const getEvents = async (): Promise<Event[]> => {
    const eventsLocalStorage = localStorage.getItem("events");
    const events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];
    return events;
}

export { createEvent, updateEvent, deleteEvent, getEvents }