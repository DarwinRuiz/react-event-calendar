import { AuthStatus } from "../enums/authStatus";

export interface AuthInitialState {
    status: AuthStatus;
    user: Record<string, any>;
    errorMessage: undefined | string;
}