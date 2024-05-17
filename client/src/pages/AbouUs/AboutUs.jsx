import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className='aboutUs-container'>
      <header>
        <div className='leanKata-backdrop'>
          <h1>Lean<span>K</span>ata</h1>
        </div>
      </header>
      <main>
        <section>
        <h3>¡Conoce nuestra <span>metodología</span> y mejora tus procesos!</h3>
        <p>Originada en el Sistema de Producción de Toyota, se centra en la eliminación de desperdicios y la mejora continua 'Kaizen' para aumentar la eficiencia y la calidad. </p>
        <p>Kata es un patrón o rutina de comportamiento que se practica regularmente hasta que se convierte en un hábito. </p>
        </section>


  <div className='cardsContainer'>
        <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">
        <img src=""/>
                <h4>Mejora</h4>
                <p>Los equipos aprenden a identificar y abordar los problemas de manera sistemática</p>
        </div>
        </div>

        <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">
        <img src=""/>
                <h4>Aprendizaje</h4>
                <p>Los equipos están constantemente experimentando y evaluando resultados.</p>
        </div>
        </div>

        <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">
        <img src=""/>
                <h4> Eficiencia </h4>
                <p>Las organizaciones pueden mejorar significativamente su eficiencia operativa.</p>
        </div>
        </div>
    </div>
        <hr></hr>
        
        <iframe src="https://www.youtube.com/embed/L8k0OJjKWSI?si=USM3f5VW1JU0WTxY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div className='leankataDescription'>
        <p className='shortDescription'>La metodología Lean Kata es una forma de gestión y mejora continua inspirada en los principios del Lean Manufacturing y la filosofía Kaizen. Fue desarrollada por Mike Rother en su libro "Toyota Kata", donde analiza cómo Toyota ha logrado su éxito a través de la implementación de prácticas de mejora continua.</p>
        <p className='shortDescription'>En esencia, Kata es un término japonés que se refiere a una forma de practicar algo de manera repetida y disciplinada hasta que se convierte en una habilidad natural. En el contexto del Lean Management, Kata se refiere a una serie de prácticas y rutinas que permiten a los equipos aprender, mejorar y resolver problemas de manera sistemática.</p>
        </div>
        </main>
    </div>
  )
}

export default AboutUs