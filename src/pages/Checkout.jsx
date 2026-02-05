import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'transfer'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Mohon lengkapi semua data yang diperlukan!');
      return;
    }

    // Simulasi proses checkout
    setIsSubmitted(true);
    
    // Clear cart setelah 2 detik
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="checkout-section">
        <div className="container">
          <div className="cart-empty">
            <h2>Keranjang Kosong</h2>
            <p>Silakan tambahkan produk ke keranjang terlebih dahulu</p>
            <button 
              onClick={() => navigate('/products')} 
              className="btn-primary"
            >
              Mulai Belanja
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="checkout-section">
        <div className="container">
          <div className="success-message">
            <h2>✅ Pesanan Berhasil!</h2>
            <p>Terima kasih telah berbelanja. Pesanan Anda sedang diproses.</p>
            <p>Nomor pesanan: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <button 
              onClick={() => navigate('/')} 
              className="btn-primary"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <div className="container">
        <h1 className="section-title">Checkout</h1>
        
        <div className="checkout-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Data Pembeli</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Nama Lengkap *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Alamat Lengkap *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Kota *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Kode Pos</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Metode Pembayaran</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem',
                  border: '1px solid #bdc3c7',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }}
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Cash on Delivery</option>
                <option value="ewallet">E-Wallet</option>
              </select>
            </div>

            <button type="submit" className="btn-place-order">
              Buat Pesanan
            </button>
          </form>

          <div className="order-summary">
            <h2>Ringkasan Pesanan</h2>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <div>
                  <p>{item.name}</p>
                  <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <p style={{ fontWeight: 'bold' }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="summary-row" style={{ marginTop: '1rem' }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
