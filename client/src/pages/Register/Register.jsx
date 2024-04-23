import React from 'react'
import  { useForm } from 'react-hook-form'

const Register = () => {
  return (
    <>
        <form className="register" onSubmit={handleSubmit(onSubmit)}>
            <input name='name' {...register('name', {required:true})} className="register_username" placeholder="Nombre" required/>
            <input type="email" name='email' {...register('email', {required:true})} className="register_email" placeholder="Email" required/>
            <input type="password" name='password' {...register('password', {required:true})} className="register_password" placeholder="Contraseña" required/>
            <button type="submit">Register</button>
            <p>¿Ya tienes una cuenta?</p>
            <button onClick={() => navigate(`/login`)} className='registrer_option_changer'>Login</button>
        </form>
    </>
  )
}

export default Register