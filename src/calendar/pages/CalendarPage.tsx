import { Calendar, Event, View } from 'react-big-calendar'
import { localizer } from '../../helpers/calendarLocalizer'
import { CSSProperties, useState } from 'react'
import { Navbar } from "../components/Navbar"
import { getMessages } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'


export const CalendarPage = (): JSX.Element => {

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent } = useCalendarStore()

    const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week')

    const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean): { className?: string | undefined; style?: CSSProperties | undefined; } => {

        return {
            style: {
                backgroundColor: '#327CF7',
                borderRadius: '0px',
                opacity: 0.8,
                color: 'white',
            }
        }
    }

    const onDoubleClick = (event: Event) => {
        openDateModal()
    }

    const onSelect = (event: Event) => {
        setActiveEvent(event)
    }

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={'week'}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
