import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isDateModalOpen: false,
    },
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