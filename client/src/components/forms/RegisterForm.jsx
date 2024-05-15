import { useState } from 'react'; // Importa el hook useState de React para manejar el estado en el componente
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate de React Router DOM para la navegación y enlaces entre páginas
import { useUserContext } from '../../context/UserContext'; // Importa el contexto del usuario desde UserContext.jsx
import { loginUser } from '../../services/logReg'; // Importa la función de inicio de sesión desde el servicio logReg

const LoginForm = () => {
  // Define el estado para el correo electrónico, la contraseña y los mensajes de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Obtiene la función de navegación para redirigir al usuario después del inicio de sesión
  const navigate = useNavigate();

  // Obtiene el contexto del usuario para acceder al estado y funciones relacionadas con el usuario
  const { setUserAuth, setUser } = useUserContext();

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario al enviar

    try {
      // Realiza la solicitud de inicio de sesión con el correo electrónico y la contraseña
      const data = await loginUser(email, password);
      
      // Guarda el token de autenticación en el almacenamiento local
      localStorage.setItem('authToken', data.token);
      
      // Actualiza el estado del usuario en el contexto con los datos obtenidos de la solicitud
      setUser(data.data);
      
      // Establece la autenticación del usuario como verdadera
      setUserAuth(true);
      
      // Redirige al usuario a la página de inicio
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);

      // Manejo de errores durante el inicio de sesión
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
    <> {/* Fragmento de React para envolver múltiples elementos */}
      <form onSubmit={handleSubmit} className="px-8 pb-8 mb-4"> {/* Formulario de inicio de sesión */}
        {/* Campo para ingresar el correo electrónico */}
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
              placeholder="hola.soy.nuria@gmail.com"
            />
            {emailError && <p className="text-[#FB005A] text-xs mt-2">{emailError}</p>} {/* Muestra el mensaje de error del correo electrónico si existe */}
          </label>
        </div>

        {/* Campo para ingresar la contraseña */}
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
            {passwordError && <p className="text-[#FB005A] text-xs">{passwordError}</p>} {/* Muestra el mensaje de error de la contraseña si existe */}
          </label>
        </div>

        {/* Botón para enviar el formulario de inicio de sesión */}
        <div className="flex flex-col items-center">
          <button
            className="w-full font-poppins bg-gradient-to-r rounded-lg from-[#B800B0] to-[#FB005A] hover:from-[#FB005A] hover:to-[#B800B0] text-white py-2 px-4 focus:outline-none focus:shadow-outline mb-5 h-12"
            type="submit"
          >
            Iniciar sesión
          </button>
          
          {/* Enlace para redirigir a los usuarios a la página de registro si no tienen una cuenta */}
          <p className="font-poppins text-[#9E9E9E] justify-center">
            ¿No tienes cuenta? <Link to="/registerform" className="text-white">Regístrate</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm; // Exporta el componente LoginForm
