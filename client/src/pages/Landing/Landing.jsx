import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.css';
import grow from '../../assets/img/grown.svg';

const Landing = () => {
  return(
    <>
     <main className="landing">
      <section className="section-left">
          <h1 className='landing-title'>¡Tu camino<br/>hacia la mejora <br/>continua con <br />Lean <span className="k-title-landing">K</span>ata!</h1>
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
      </section>
      <section className='section-right'>
          <img className='img-landing' src={grow} alt="img-landing" />
      </section>
  </main> 
    </>
  )

}
  export default Landing;