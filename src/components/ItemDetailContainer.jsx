import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductById } from './productsService';

export default function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (quantity > 0 && quantity <= product.stock) {
      addToCart({ ...product, quantity });
      toast.success(`${quantity} ${product.title} agregado(s) al carrito 🛒`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (!product) return <div className="not-found">Producto no encontrado</div>;

  return (
    <div className="item-detail-container">
      {product.category && (
        <Link to={`/products/${product.category}`} className="back-link">
          ← Volver a {product.category}
        </Link>
      )}

      <div className="detail-content">
        <div className="detail-image">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>

        <div className="detail-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price.toLocaleString()}</p>
          <p className="description">{product.description}</p>

          {product.details && (
            <div className="specs">
              <h3>Especificaciones</h3>
              <p>{product.details}</p>
            </div>
          )}

          <div className="quantity-selector">
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              max={product.stock || 1}
              value={quantity}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(1, parseInt(e.target.value || 1)),
                  product.stock || 1
                );
                setQuantity(isNaN(value) ? 1 : value);
              }}
            />
            {product.stock && (
              <p className="stock">Disponibles: {product.stock} unidades</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={!product.stock || product.stock <= 0}
          >
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}