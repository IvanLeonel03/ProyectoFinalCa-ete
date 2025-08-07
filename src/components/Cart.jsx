import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity)) {
      updateQuantity(item.id, 1);
    } else {
      updateQuantity(item.id, Math.max(1, quantity));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    try {
      const ventaData = {
        nombre: formData.name,
        email: formData.email,
        direccion: formData.address,
        productos: cart.map(item => ({
          id: item.id,
          nombre: item.title,
          cantidad: item.quantity,
          precio: item.price,
          imagen: item.image || ''
        })),
        total: totalPrice,
        fecha: serverTimestamp(),
        estado: 'completada'
      };
      
  
      const docRef = await addDoc(collection(db, 'Venta'), ventaData);
      console.log('Venta registrada con ID:', docRef.id);
      
      clearCart();
      setCheckoutStep('completed');
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      alert('Ocurrió un error al procesar tu compra. Por favor intenta nuevamente.');
    }
  };

  if (checkoutStep === 'completed') {
    return (
      <div className="cart-page">
        <div className="order-completed">
          <h2>¡Compra realizada con éxito!</h2>
          <p>Recibirás un correo de confirmación en <strong>{formData.email}</strong></p>
          <Link to="/products" className="continue-shopping">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'form') {
    return (
      <div className="cart-page">
        <h1>Finalizar Compra</h1>
        
        <form onSubmit={handleCheckout} className="checkout-form">
          <div className="form-section">
            <h3>Información de Contacto</h3>
            <div className="form-group">
              <label>Nombre completo*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Dirección*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Información de Pago</h3>
            <div className="form-group">
              <label>Número de tarjeta*</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fecha exp.*</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV*</label>
                <input
                  type="text"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setCheckoutStep('cart')} className="back-btn">
              Volver al carrito
            </button>
            <button type="submit" className="confirm-btn">
              Confirmar Pago
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrito de Compras {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>No hay productos en el carrito</p>
          <Link to="/products" className="continue-shopping">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || 'https://via.placeholder.com/100'} alt={item.title} />
                </div>
                
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="price">Precio unitario: ${item.price.toFixed(2)}</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      min="1"
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  
                  <p className="subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Resumen de Compra</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart">
                Vaciar Carrito
              </button>
              
              <button 
                onClick={() => setCheckoutStep('form')} 
                className="checkout-btn"
              >
                Finalizar Compra
              </button>
              
              <Link to="/products" className="continue-shopping">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;