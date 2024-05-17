import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register } from '../../services/userService';

const Register = () => {
    const { register: useFormRegister, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                setPasswordsMatch(false);
                return;
            }

            const response = await register(data.email, data.password, data.confirmPassword);

            if (response) {
                // Aquí podrías mostrar un mensaje de éxito o redirigir al usuario
                console.log('Registro exitoso');
                navigate("/");
            }
        } catch (error) {
            console.error('Error al intentar registrar:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    return (
        <div className="font-sans text-gray-900">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-Login">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[#1F1E1E] shadow-md overflow-hidden sm:rounded-lg rounded">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-8">
                            <center>
                                <span className="text-2xl text-[#EEF0E5] font-semibold">Registro de usuarios</span>
                            </center>
                        </div>
                        <div>
                            <input
                                id="email"
                                type='email'
                                name='email'
                                placeholder='Email'
                                {...useFormRegister('email', { required: true, pattern: /^\S+@\S+$/i })}
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] bg-[#EEF0E5]" />
                            {errors.email && <p className="text-red-500 text-sm">Email inválido</p>}
                        </div>
                        <div className="mt-4">
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Contraseña"
                                    autoComplete="new-password"
                                    {...useFormRegister('password', { required: true, minLength: 6 })}
                                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] bg-[#EEF0E5]" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" id="togglePassword1" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600" onClick={togglePasswordVisibility}>
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">La contraseña debe tener al menos 6 caracteres</p>}
                        </div>
                        <div className="mt-4">
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirmar contraseña"
                                    autoComplete="new-password"
                                    {...useFormRegister('confirmPassword', { required: true })}
                                    className={`w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] bg-[#EEF0E5] ${!passwordsMatch ? 'border-red-500' : ''}`} />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" id="togglePassword1" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>
                            {!passwordsMatch && <p className="text-red-500 text-xs">Las contraseñas no coinciden</p>}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-[#EEF0E5] border border-transparent rounded-md font-semibold text-xs text-[#1F1E1E] tracking-widest hover:bg-[#7192A4] focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
                <button onClick={() => navigate("/")} className="inline-flex items-center px-4 py-2 bg-[#1F1E1E] border border-transparent rounded-md font-semibold text-xs text-[#EEF0E5] uppercase tracking-widest hover:bg-[#7192A4] focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-5">
                    Iniciar sesión
                </button>
            </div >
        </div >
    );
};

export default Register;