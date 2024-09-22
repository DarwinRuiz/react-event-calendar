import calendarApi from "../api/calendarApi";

const login = async (email: string, password: string): Promise<{ name: string; __id: string }> => {
    const { data } = await calendarApi.post('/auth', { email, password });

    localStorage.setItem('token', data.token);
    return { name: data.name, __id: data.uid }
}

const signUp = async (name: string, email: string, password: string): Promise<{ name: string; __id: string }> => {
    const { data } = await calendarApi.post('/auth/new', { name, email, password });
    localStorage.setItem('token', data.token);

    return { name: data.name, __id: data.uid }
}

const checkToken = async (): Promise<{ name: string; __id: string }> => {
    try {
        const { data } = await calendarApi.get('/auth/renew');
        localStorage.setItem('token', data.token);
        return { name: data.name, __id: data.uid }
    } catch (error: any) {
        localStorage.clear()
        throw new error;
    }
}

const logout = () => {
    localStorage.clear()
}

export { login, signUp, checkToken, logout }