import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify' 
import '../App.css'


const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.title} agregado al carrito 🛒`)
  }

  return (
    <div className="item-card">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
      )}
      <h3>{product.title}</h3>
      <p>Precio: ${product.price}</p>
      <div className="item-actions">
        <Link to={`/item/${product.id}`} className="details-btn">
          Ver Detalles
        </Link>
        <button 
          onClick={handleAddToCart }
          className="add-to-cart-btn"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}

export default Item
