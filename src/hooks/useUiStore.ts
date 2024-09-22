import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = (): Record<string, any> => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

    const openDateModal = (): void => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = (): void => {
        dispatch(onCloseDateModal())
    }

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal
    }
}