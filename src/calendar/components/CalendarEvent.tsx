import { EventProps } from "react-big-calendar"

export const CalendarEvent = ({ event }: EventProps): JSX.Element => {

    const { title, resource } = event
    const { user } = resource

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
}
