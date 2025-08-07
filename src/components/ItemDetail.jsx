import { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function ItemDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${quantity} ${product.title} agregado(s) al carrito 🛒`);
  };

  return (
    <div className="item-detail-container">
      <Link to={`/products/${product.category}`} className="back-link">
        ← Volver a {product.category}
      </Link>
      
      <div className="detail-content">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="detail-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          
          <div className="specs">
            <h3>Especificaciones</h3>
            <p>{product.details}</p>
            <p className="stock">Disponibles: {product.stock} unidades</p>
          </div>
          
          <div className="quantity-selector">
            <label>Cantidad:</label>
            <input 
              type="number" 
              min="1" 
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(1, parseInt(e.target.value || 1)),
                  product.stock
                );
                setQuantity(isNaN(value) ? 1 : value);
              }}
            />
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
