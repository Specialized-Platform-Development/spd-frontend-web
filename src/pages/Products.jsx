import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import productService from '../services/productService';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        // API returns { success: true, data: { products: [], count: n } }
        if (fetchedProducts.data && fetchedProducts.data.products && Array.isArray(fetchedProducts.data.products)) {
          setProducts(fetchedProducts.data.products);
        } else if (fetchedProducts.data && Array.isArray(fetchedProducts.data)) {
          setProducts(fetchedProducts.data);
        } else if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Unexpected product data format", fetchedProducts);
          setProducts([]);
        }

      } catch (error) {
        console.error("Failed to load products", error);
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

  if (loading) {
    return (
      <div className="products-section">
        <div className="container">
          <h1 className="section-title">Semua Produk</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-section">
      <div className="container">
        <h1 className="section-title">Semua Produk</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image">
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
                  to={`/product/${product._id}`}
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
