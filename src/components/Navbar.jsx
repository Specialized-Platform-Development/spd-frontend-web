import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🛒 Toko Online
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/products">Produk</Link>
            </li>
            <li>
              <Link to="/cart">
                Keranjang
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
