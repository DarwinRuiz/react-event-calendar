import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import './../styles/CalendarModal.css';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';


registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = (): JSX.Element => {

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formValue, setFormValue] = useState({
        title: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        resource: { notes: '' }
    })

    const titleClass = useMemo(() => {
        if (!formSubmitted) return ''

        return (formValue.title.trim().length > 0) ? '' : 'is-invalid'

    }, [formValue.title, formSubmitted])


    useEffect(() => {
        if (activeEvent) setFormValue({ ...activeEvent })

    }, [activeEvent])


    const onInputChanged = (event: Record<string, any>): void => {
        const { name, value } = event.target as HTMLInputElement

        if (name === 'notes') {
            setFormValue({
                ...formValue,
                resource: {
                    ...formValue.resource,
                    notes: value
                }
            })
            return
        }

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const onDatePickerChanged = (event: Date | null, changing: string): void => {
        setFormValue({
            ...formValue,
            [changing]: event
        })
    }


    const onCloseModal = (): void => {
        closeDateModal()
    }

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        setFormSubmitted(true)

        const formSendConfirm = await Swal.fire({
            title: "¿Desea guardar el evento?",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true
        });


        if (!formSendConfirm.isConfirmed) return


        const difference = differenceInSeconds(formValue.end, formValue.start)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
            return
        }

        if (formValue.title.trim().length < 2) {
            Swal.fire('Error', 'El título es obligatorio', 'error')
            return
        }

        Swal.fire('Evento guardado', formValue.title, 'success')

        await startSavingEvent(formValue)
        closeDateModal()

        setFormSubmitted(false)
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Evento </h1>
            <hr />
            <form className="container" onSubmit={onFormSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        selected={formValue.start}
                        onChange={(event) => { onDatePickerChanged(event, 'start') }}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora' />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        className="form-control"
                        selected={formValue.end}
                        onChange={(event) => { onDatePickerChanged(event, 'end') }}
                        dateFormat='Pp'
                        minDate={formValue.start}
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora' />

                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={formValue.resource.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
