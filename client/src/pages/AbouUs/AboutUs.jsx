import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className='aboutUs-container'>
      <section>
        <div className='leanKata-backdrop'>
          <h1>Lean<span>K</span>ata</h1>
        </div>
      </section>
      <main>
        <h3>Conoce nuestra metodología</h3>
        <p>Descripcion de la metodología</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/L8k0OJjKWSI?si=USM3f5VW1JU0WTxY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </main>
    </div>
  )
}

export default AboutUs