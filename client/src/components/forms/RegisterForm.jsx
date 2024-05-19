import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useId } from 'react';
import { useUserContext } from '../../context/UserContext';
import { registerUser } from '../../services/logReg';
import * as Yup from 'yup';
import "./css/RegForm.css";

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const termsId = useId();
  const { setUserAuth, setUser } = useUserContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido.').min(2, 'El nombre debe tener al menos dos caracteres.'),
    email: Yup.string().email('El email debe ser válido.').required('El email es requerido.'),
    password: Yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
,
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*(),.?":{}|<>) y debe tener al menos 8 caracteres.'
      ),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ name, email, password }, { abortEarly: false });
      const data = await registerUser(name, email, password);
      localStorage.setItem('authToken', data.token);
      setUser(data.data);
      setUserAuth(true);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);

      error.inner.forEach((err) => {
        if (err.path === 'name') {
          setNameError(err.message);
        } else if (err.path === 'email') {
          setEmailError(err.message);
        } else if (err.path === 'password') {
          setPasswordError(err.message)
        }
      });
    }
  };

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form-create-reg">
        <h2>Registrarme</h2>
          <div className="items">
            <label className="label-item" htmlFor="name">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                required
                className="input-reg-name"
                id="name"
                placeholder="Nombre"
              />
              {nameError && <p className="text-[#FB005A] text-xs">{nameError}</p>}

          </div>
          <div className="items">
            <label className="label-item" htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
                className="input-reg"
                id="email"
                placeholder="hola@gmail.com"
              />
              {emailError && <p className="text-[#FB005A] text-xs">{emailError}</p>}
          </div>
          <div className="items">
 
            <label className="label-item" htmlFor="password">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                required
                className="input-reg"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
              {passwordError && <p className="text-[#FB005A] w-80 text-xs">{passwordError}</p>}
          </div>
          <div className="items-check">
            <input className="input-reg-check" type="checkbox" id={termsId} name="terms" required/>
            <label className="label-item" htmlFor={termsId}>
              <span className="legend-form">He leído y acepto los términos y condiciones</span>
            </label>
          </div>
          <div className="items">
            <button className="button-forms-reg" type="submit">Registrarme</button>
            <p className="paragraph-reg">¿Ya tienes cuenta? <Link to="/login" className="button-reg">Inicia sesión</Link></p>
          </div>
        </form>
      </div>
  );
}

export default RegisterForm;