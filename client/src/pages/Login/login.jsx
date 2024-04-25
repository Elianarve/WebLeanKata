import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para manejar el inicio de sesión y redirigir a la página de inicio
    const handleLogin = async (data) => {
        try {
            // Aquí puedes agregar tu lógica para iniciar sesión
            // Por ejemplo, hacer una solicitud al servidor para autenticar al usuario
            // Una vez que se completa el inicio de sesión, redirigir a la página de inicio
            // Por ahora, simplemente redirigiremos a "/home" sin lógica de autenticación
            console.log("Inicio de sesión exitoso:", data);
            navigate('/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Aquí puedes manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <form onSubmit={handleSubmit(handleLogin)} className="login-form">
                    <div className="login-form-header">
                        <h2 className="login-form-title">Inicio de sesión</h2>
                    </div>
                    <div className="login-form-input">
                        <input id="email" autoComplete="on" type='email' placeholder='Email' {...register('email', { required: true })} className="login-input" />
                        {errors.email && <p className="login-error-message">El email no puede estar vacío</p>}
                    </div>
                    <div className="login-form-input">
                        <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Contraseña" {...register('password', { required: true })} className="login-input" />
                        <button type="button" id="togglePassword" className="login-toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                        {errors.password && <p className="login-error-message">La contraseña no puede estar vacía</p>}
                    </div>
                    <div className="login-form-submit">
                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <button onClick={() => navigate("/register")} className="register-button">
                    Registro nuevos usuarios
                </button>
            </div>
        </div>
    );
};

export default Login;
