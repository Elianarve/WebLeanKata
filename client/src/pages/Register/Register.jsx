import React from 'react'
import  { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();
    // const { register, handleSubmit, formState: {errors} } = useForm();

  return (
    <>
        <form className="register" /*onSubmit={handleSubmit(onSubmit)}*/>
            <input name='name' className="registerUsername" placeholder="Nombre" /*{...register('name', {required:true})}*/ required/>
            <input type="email" name='email' className="registerEmail" placeholder="Email" /*{...register('email', {required:true})}*/ required/>
            <input type="password" name='password' className="registerPassword" placeholder="Contraseña" /*{...register('password', {required:true})}*/ required/>
            <button type="submit">Register</button>
            <p>¿Ya tienes una cuenta?</p>
            <button  className='ChangeToLoginButton' onClick={() => navigate(`/login`)}>Login</button>
        </form>
    </>
  )
}

export default Register