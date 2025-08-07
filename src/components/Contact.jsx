import { useRef } from 'react';


const Contact = () => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito');
    formRef.current.reset();
  };

  return (
    <div className="contact-page">
      <h1>Contáctanos</h1>
      
      <div className="contact-top-section">
      
        <div className="contact-info-box">
          <h2>Medios de Comunicación</h2>
          <div className="contact-method">
            <h3>Email</h3>
            <p>contacto@mitienda.com</p>
          </div>
          <div className="contact-method">
            <h3>Teléfono</h3>
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="contact-method">
            <h3>Redes Sociales</h3>
            <p>@MiTiendaOficial</p>
          </div>
          <div className="contact-method">
            <h3>Dirección</h3>
            <p>Calle Principal 123, Ciudad, País</p>
          </div>
        </div>

        <div className="map-box">
          <h2>Ubicación</h2>
          <div className="map-container">
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132183!2d-73.98784468459382!3d40.748440479327996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTMuNiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="contact-form-box">
        <h2>Envíanos un Mensaje</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input type="text" id="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;