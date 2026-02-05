import { Link } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="products-section">
      <div className="container">
        <h1 className="section-title">Semua Produk</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>
                <p className="product-description">
                  {product.description.substring(0, 100)}...
                </p>
                <Link 
                  to={`/product/${product.id}`} 
                  className="btn-view-detail"
                >
                  Lihat Detail
                </Link>
                <button 
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
