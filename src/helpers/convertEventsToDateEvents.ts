import { parseISO } from "date-fns";
import { Event } from "react-big-calendar";

export const convertEventsToDateEvents = (events: Event[]): Event[] => {
    return events.map((event: Event) => {

        event.start = parseISO(event.start as unknown as string)
        event.end = parseISO(event.end as unknown as string)

        return event
    })
}