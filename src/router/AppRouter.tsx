import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { AuthStatus } from "../store/enums/authStatus"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"


export const AppRouter = (): JSX.Element => {


    const { status, checkAuthToken } = useAuthStore()


    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === AuthStatus.Checking) {
        return <h1>Cargando...</h1>
    }

    return (
        <Routes>
            {
                (status === AuthStatus.Unauthenticated) ?
                    (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
