import { createSlice } from "@reduxjs/toolkit";
import { UiInitialState } from "../interfaces/uiInitialState";

const initialState: UiInitialState = {
    isDateModalOpen: false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        onOpenDateModal: (state): void => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state): void => {
            state.isDateModalOpen = false;
        }
    },
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;