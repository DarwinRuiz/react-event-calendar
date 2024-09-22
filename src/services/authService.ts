

const login = async (email: string, password: string): Promise<{ name: string; __id: string }> => {

    const userLocalStorage = localStorage.getItem('user');
    if (!userLocalStorage) throw new Error('No user found');

    const user = JSON.parse(userLocalStorage);

    if (user.email !== email || user.password !== password) throw new Error('Invalid credentials');

    const tokenLocal = (new Date().getTime() * 123456).toString();
    localStorage.setItem('token', tokenLocal);

    return { name: user.name, __id: user.__id }
}

const signUp = async (name: string, email: string, password: string): Promise<{ name: string; __id: string }> => {

    const user = { name: name, email: email, password: password, __id: (new Date().getTime()).toString() };
    localStorage.setItem('user', JSON.stringify(user));

    const tokenLocal = (new Date().getTime() * 123456).toString();
    localStorage.setItem('token', tokenLocal);

    return { name: user.name, __id: user.__id }
}

const checkToken = async (): Promise<{ name: string; __id: string }> => {
    try {

        const userLocalStorage = localStorage.getItem('user');
        if (!userLocalStorage) throw new Error('No user found');

        const user = JSON.parse(userLocalStorage);

        const tokenLocal = (new Date().getTime() * 123456).toString();
        localStorage.setItem('token', tokenLocal);

        return { name: user.name, __id: user.__id }
    } catch (error: any) {
        localStorage.clear()
        throw new error;
    }
}

const logout = () => {
    localStorage.removeItem('token');
}

export { login, signUp, checkToken, logout }