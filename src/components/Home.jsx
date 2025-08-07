

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-image">
          <img 
            src="/assets/main.jpg" 
            alt="Producto destacado" 
          />
        </div>
        
        <div className="home-text">
          <h2>Bienvenido a nuestra tienda</h2>
          <p>
            En MiTienda encontrarás los mejores productos al mejor precio. 
            Nuestra colección incluye una amplia variedad de artículos cuidadosamente seleccionados.
          </p>
          <p>
            Explora nuestras categorías y descubre ofertas exclusivas. 
            Calidad garantizada en todos nuestros productos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;