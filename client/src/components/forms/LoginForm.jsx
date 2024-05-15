import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Importa el contexto del usuario
import { loginUser } from '../../services/logReg'; // Importa la función de inicio de sesión

const LoginForm = () => {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [emailError, setEmailError] = useState(''); // Estado para errores de correo electrónico
  const [passwordError, setPasswordError] = useState(''); // Estado para errores de contraseña
  const navigate = useNavigate(); // Función de navegación
  const { setUserAuth, setUser } = useUserContext(); // Obtiene el contexto del usuario

  const handleSubmit = async (e) => { // Función para manejar el envío del formulario
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    
    try {
      const data = await loginUser(email, password); // Realiza la solicitud de inicio de sesión
      localStorage.setItem('authToken', data.token); // Guarda el token de autenticación en el almacenamiento local
      setUser(data.data); // Actualiza los datos del usuario en el contexto
      setUserAuth(true); // Establece la autenticación del usuario como verdadera
      navigate('/home'); // Navega a la página de inicio después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error:', error);

      // Manejo de errores de inicio de sesión
      if (error.message.includes('Usuario no registrado.')) {
        setEmailError('Usuario no registrado.');
        setPasswordError('');
      } else if (error.message.includes('Contraseña incorrecta.')) {
        setPasswordError('Contraseña incorrecta.');
        setEmailError('');
      } else {
        setPasswordError('Error en la solicitud de inicio de sesión');
        setEmailError('');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="px-8 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-white font-poppins mb-2 text-left" htmlFor="email">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              required
              className="font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
              id="email"
              placeholder="hola.soy.bea@gmail.com"
            />
            {emailError && <p className="text-[#FB005A] text-xs mt-2">{emailError}</p>}
          </label>
        </div>

        <div className="mb-6">
          <label className="font-poppins block text-white mb-2 text-left" htmlFor="password">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              required
              className="font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
              id="password"
              placeholder="Ingresa tu contraseña"
            />
            {passwordError && <p className="text-[#FB005A] text-xs">{passwordError}</p>}
          </label>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="w-full font-poppins bg-gradient-to-r rounded-lg from-[#B800B0] to-[#FB005A] hover:from-[#FB005A] hover:to-[#B800B0] text-white py-2 px-4 focus:outline-none focus:shadow-outline mb-5 h-12"
            type="submit"
          >
            Iniciar sesión
          </button>
          <p className="font-poppins text-[#9E9E9E] justify-center">
            ¿No tienes cuenta? <Link to="/registerform" className="text-white">Regístrate</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
