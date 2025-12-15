import React from 'react';

export default function Nosotros() {
  return (
    <div className="nosotros-container">
      <div className="container">
        <h2>Nosotros</h2>
        <div className="nosotros-content">
          <div className="nosotros-text">
            <p>
               Bienvenidos a <strong>Super Sano</strong>, donde la calidad y el bienestar
               son nuestras prioridades. Nos dedicamos a seleccionar cuidadosamente los
               mejores productos naturales de origen responsable, para que puedas disfrutar
               de una alimentación consciente, saludable y deliciosa.
            </p>
            <p>
               Creemos que la alimentación es mucho más que nutrición: es un acto de amor
               hacia tu cuerpo y hacia el planeta. Por eso cada producto en Super Sano ha sido
               elegido con la mayor rigurosidad, garantizando autenticidad, frescura y pureza.
               Desde harinas integrales hasta aceites prensados en frío, semillas nutritivas y
               especias aromáticas, todo lo que ofrecemos refleja nuestro compromiso con la
               excelencia.
            </p>
            <p>
               Nuestro equipo está formado por amantes de la naturaleza y la gastronomía
               consciente, siempre dispuestos a ayudarte a encontrar exactamente lo que
               necesitas para vivir mejor. Porque en Super Sano, tu bienestar es nuestra
               misión. Bienvenido a una comunidad donde la salud y el sabor van de la mano.
            </p>
          </div>
          <div className="nosotros-image-wrapper">
            <img src="/images/imagennosotros.jpg" alt="Nosotros - Super Sano" className="nosotros-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
