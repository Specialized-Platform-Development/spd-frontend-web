import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h2>Produk tidak ditemukan</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} berhasil ditambahkan ke keranjang!`);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="detail-container">
          <div className="detail-image">
            {product.image}
          </div>
          <div className="detail-info">
            <h1>{product.name}</h1>
            <p className="detail-price">{formatPrice(product.price)}</p>
            <p className="detail-description">{product.description}</p>
            
            <div className="quantity-selector">
              <label>Jumlah:</label>
              <button 
                className="quantity-btn" 
                onClick={decrementQuantity}
              >
                -
              </button>
              <input 
                type="number" 
                className="quantity-input"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min="1"
              />
              <button 
                className="quantity-btn" 
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>

            <button 
              className="btn-add-cart"
              onClick={handleAddToCart}
            >
              Tambah ke Keranjang - {formatPrice(product.price * quantity)}
            </button>
            
            <button 
              className="btn-primary"
              onClick={() => navigate('/products')}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Kembali ke Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
