import React from 'react';
import {Link} from 'react-router-dom';
// import Spline from '../components/Spline.jsx';
import './Landing.css';

const Landing = () => {
  return(
    <>
     <main className="landing">
      <section className="section-left size-fit">
          <h1 className='landing-title'>¡Tu camino<br/>hacia la mejora continua <br/><span className="text-[#FB005A]">con LeanKata!</span></h1>
          <p className='landing-text'>Descubre nuevos <br/> retos .</p>
          {/* <div  className='buttons'> */}
            <Link to="/RegisterForm">
              <button className='register-btn'>
                Regístrate
              </button>
            </Link>
            <Link to ="/login">
              <button className='login-btn'>
                Iniciar sesión
              </button>
            </Link>
          {/* </div> */}
      </section>
      <section className='section-right'>
          {/* <Spline/> */}
      </section>
  </main> 
    </>
  )

}
  export default Landing;