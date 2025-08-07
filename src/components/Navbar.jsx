import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function NavBar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <NavLink to="/" className="navbar-logo">
            <img src="/assets/nike.png" alt="Logo" />
          </NavLink>
        </div>
        
        <div className="navbar-right">
          <NavLink to="/" className="navbar-link">Inicio</NavLink>
          <NavLink to="/products" className="navbar-link">Productos</NavLink>
          <NavLink to="/contact" className="navbar-link">Contactos</NavLink>
          <NavLink to="/admin" className="navbar-link">Admin</NavLink>
          <NavLink to="/cart" className="navbar-cart">
            <img src="/assets/carrito.png" alt="" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}