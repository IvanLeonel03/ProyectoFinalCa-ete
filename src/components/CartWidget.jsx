import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

export default function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget" aria-label="Carrito de compras">
      <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      {totalItems > 0 && (
        <span className="cart-badge">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
}