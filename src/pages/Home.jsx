import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Home = () => {
  const { addToCart } = useCart();

  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Selamat Datang di Toko Online</h1>
          <p>Temukan produk elektronik terbaik dengan harga terjangkau</p>
          <Link to="/products" className="btn-primary">
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Produk Unggulan</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
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
      </section>
    </div>
  );
};

export default Home;
