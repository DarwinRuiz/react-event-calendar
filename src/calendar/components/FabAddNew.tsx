import { addHours } from 'date-fns'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import './../styles/FabAddNew.css'


export const FabAddNew = (): JSX.Element => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClick = (): void => {
        setActiveEvent(
            {
                title: '',
                start: new Date(),
                end: addHours(new Date(), 2),
                resource: {
                    user: {
                        __id: '1',
                        name: 'Darwin Ruiz',
                    },
                    notes: ''
                }
            }
        )
        openDateModal()
    }

    return (
        <button className="btn btn-primary fab" onClick={handleClick}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
