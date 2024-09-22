
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import './../styles/FabDelete.css'


export const FabDelete = (): JSX.Element => {

    const { startDeletingEvent, hasEventSelectedWithId } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleClick = (): void => {
        startDeletingEvent()
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleClick} style={{
            display: hasEventSelectedWithId && !isDateModalOpen ? '' : 'none'
        }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
