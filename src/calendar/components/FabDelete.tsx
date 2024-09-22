
import Swal from 'sweetalert2'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import './../styles/FabDelete.css'


export const FabDelete = (): JSX.Element => {

    const { startDeletingEvent, hasEventSelectedWithId } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleClick = async (): Promise<void> => {
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
