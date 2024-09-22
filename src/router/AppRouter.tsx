import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"


export const AppRouter = (): JSX.Element => {

    const authStatus = 'nnot-authenticated'

    return (
        <Routes>
            {
                (authStatus === 'not-authenticated') ?
                    <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }

        </Routes>
    )
}
