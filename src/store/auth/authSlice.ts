import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../interfaces/authInitialState";
import { AuthStatus } from "../enums/authStatus";

const initialState: AuthInitialState = {
    status: AuthStatus.Checking,
    user: {},
    errorMessage: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state): void => {
            state.status = AuthStatus.Checking;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action): void => {
            state.status = AuthStatus.Authenticated;
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action): void => {
            state.status = AuthStatus.Unauthenticated;
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state): void => {
            state.errorMessage = undefined;
        }
    },
});


export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;