import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { checkToken, login, logout, signUp } from "../services/authService";
import { onClearEvents } from "../store/calendar/calendarSlice";

export const useAuthStore = (): Record<string, any> => {

    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }: Record<string, string>) => {
        dispatch(onChecking())
        try {
            const data = await login(email, password);
            dispatch(onLogin({ name: data.name, __id: data.__id }));
        } catch (error) {
            dispatch(onLogout('Usuario o contraseña incorrectos'));
            setTimeout(() => {
                dispatch(onLogout(undefined));
            }, 3000);
        }
    }

    const startSignUp = async ({ name, email, password }: Record<string, string>) => {
        dispatch(onChecking())
        try {
            const data = await signUp(name, email, password);
            dispatch(onLogin({ name: data.name, __id: data.__id }));
        } catch (error: any) {
            dispatch(onLogout(error.response?.data?.msg || 'Error al crear el usuario'));
            setTimeout(() => {
                dispatch(onLogout(undefined));
            }, 3000);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(onLogout(undefined));
            return;
        }

        try {
            const data = await checkToken()
            dispatch(onLogin({ name: data.name, __id: data.__id }));
        } catch (error) {

            dispatch(onLogout(undefined));
        }
    }


    const startLogout = () => {
        logout()
        dispatch(onClearEvents(undefined));
        dispatch(onLogout(undefined));
    }


    return {
        status,
        user,
        errorMessage,
        startLogin,
        startSignUp,
        checkAuthToken,
        startLogout
    }
};