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
                <h4>Beneficio</h4>
                <p>Descripcion</p>
        </div>
        </div>

        <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">
        <img src=""/>
                <h4>Beneficio</h4>
                <p>Descripcion</p>
        </div>
        </div>

        <div className="card">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="card-inner">
        <img src=""/>
                <h4>Beneficio</h4>
                <p>Descripcion</p>
        </div>
        </div>
    </div>
        <hr></hr>
        
        <iframe width="560" height="315" src="https://www.youtube.com/embed/L8k0OJjKWSI?si=USM3f5VW1JU0WTxY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p>Descripcion del video</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat illum numquam pariatur provident hic inventore asperiores ad, labore tenetur alias quasi! Recusandae reiciendis, nulla adipisci laboriosam quis nisi temporibus quae!Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto necessitatibus error ipsum tempora dolore! Perspiciatis quas iure consequuntur necessitatibus, quasi corporis nostrum ipsum error, perferendis ullam commodi molestias fuga. Fuga.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate sint aliquam non maxime porro a hic quos eum voluptas culpa, eos quis autem numquam dolor ducimus? At, est aut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore aperiam aliquam, repellat, similique cum beatae quaerat iusto fugit sit quas totam. Veniam soluta in ipsum aut optio porro maiores ab.</p>
      </main>
    </div>
  )
}

export default AboutUs