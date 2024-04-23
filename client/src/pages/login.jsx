import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/usersServices'; // Asegúrate de importar este servicio correctamente
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const response = await login(data.email, data.password);
            console.log(response);
            // Realiza las acciones necesarias después de iniciar sesión, como redirigir al usuario a otra página, almacenar el token, etc.
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.',
                icon: 'error',
            });
        }
    };

    return (
        <div className="font-sans text-gray-900">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-Login">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[#1F1E1E] shadow-md overflow-hidden sm:rounded-lg rounded">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-8">
                            <center>
                                <span className="text-2xl text-[#EEF0E5] font-semibold">Inicio de sesión</span>
                            </center>
                        </div>
                        <div>
                            <input id="email" autoComplete="on" type='email' placeholder='Email' {...register('email', { required: true })} className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] bg-[#EEF0E5]" />
                            {errors.email && <p className="text-red-500 text-xs">El email no puede estar vacío</p>}
                        </div>
                        <div className="mt-4">
                            <div className="relative">
                                <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Contraseña" {...register('password', { required: true })} className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] bg-[#EEF0E5]" />

                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm">
                                    <button type="button" id="togglePassword" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600" onClick={togglePasswordVisibility}>
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs">La contraseña no puede estar vacía</p>}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button type="submit" className="inline-flex items-center px-4 py-2 bg-[#EEF0E5] border border-transparent rounded-md font-semibold text-xs text-[#1F1E1E] tracking-widest hover:bg-[#7192A4] focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
                <button onClick={() => navigate("/register")} className="inline-flex items-center px-4 py-2 bg-[#1F1E1E] border border-transparent rounded-md font-semibold text-xs text-[#EEF0E5] uppercase tracking-widest hover:bg-[#7192A4] focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-5">
                    Registro nuevos usuarios
                </button>
            </div>
        </div>
    );
};

export default Login;
