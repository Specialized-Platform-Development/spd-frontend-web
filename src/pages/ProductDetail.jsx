import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import productService from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProductById(id);
        // Handle if response is wrapper object
        if (fetchedProduct.data && fetchedProduct.data.product) {
          setProduct(fetchedProduct.data.product);
        } else {
          setProduct(fetchedProduct.data || fetchedProduct);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Produk tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  if (loading) return <div className="container" style={{ padding: '50px 0' }}>Loading...</div>;

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>Produk tidak ditemukan</h2>
        <Link to="/products" className="btn-primary">Kembali ke Produk</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-section">
      <div className="container">
        <Link to="/products" className="back-link">← Kembali ke Produk</Link>
        <div className="product-detail-container">
          <div className="product-detail-image">
            <div style={{ width: '100%', height: '400px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              {product.image || '📷'}
            </div>
          </div>
          <div className="product-detail-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
            <div className="product-meta">
              <p><strong>Kategori:</strong> {product.category || 'Elektronik'}</p>
              <p><strong>Stok:</strong> {product.stock || product.countInStock || 'Tersedia'}</p>
            </div>
            <p className="product-description">{product.description}</p>
            <button
              className="btn-add-cart btn-large"
              onClick={handleAddToCart}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
