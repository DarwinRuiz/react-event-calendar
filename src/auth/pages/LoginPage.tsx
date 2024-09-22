
import { useEffect } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useForm } from '../../hooks/useForm'
import { LoginForm } from '../interfaces/loginForm'
import { RegisterForm } from '../interfaces/registerForm'
import './LoginPage.css'
import Swal from 'sweetalert2'

const loginFormFields: LoginForm = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields: RegisterForm = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirmation: '',
}

export const LoginPage = (): JSX.Element => {

    const { startLogin, errorMessage, startSignUp } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm<LoginForm>(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPasswordConfirmation, onInputChange: onRegisterInputChange } = useForm<RegisterForm>(registerFormFields);


    const loginFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (registerPassword !== registerPasswordConfirmation) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }

        startSignUp({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error', errorMessage, 'error');
        }
    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginFormSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerFormSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirme la contraseña"
                                name="registerPasswordConfirmation"
                                value={registerPasswordConfirmation}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
