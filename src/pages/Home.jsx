import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import productService from '../services/productService';

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to load featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product._id || product.id} className="product-card">
                  <div className="product-image">
                    {/* Placeholder image since backend doesn't serve images yet */}
                    <div style={{ width: '100%', height: '200px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {product.image || '📷'}
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className="product-description">
                      {product.description ? product.description.substring(0, 100) : ''}...
                    </p>
                    <Link
                      to={`/product/${product._id || product.id}`}
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
