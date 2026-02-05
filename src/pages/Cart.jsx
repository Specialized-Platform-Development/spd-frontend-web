import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId, productName) => {
    if (window.confirm(`Hapus ${productName} dari keranjang?`)) {
      removeFromCart(productId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-section">
        <div className="container">
          <div className="cart-empty">
            <h2>Keranjang Belanja Kosong</h2>
            <p>Belum ada produk di keranjang Anda</p>
            <Link to="/products" className="btn-primary">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <div className="container">
        <h1 className="section-title">Keranjang Belanja</h1>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                {item.image}
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="1"
                    />
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="btn-remove"
                    onClick={() => handleRemove(item.id, item.name)}
                  >
                    Hapus
                  </button>
                </div>
                <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                  Subtotal: {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="summary-row">
            <span>Ongkos Kirim:</span>
            <span>Gratis</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <button 
            className="btn-checkout"
            onClick={() => navigate('/checkout')}
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
