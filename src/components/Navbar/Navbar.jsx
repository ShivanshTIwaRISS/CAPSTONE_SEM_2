import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img src="/image.png" alt="OS" />
        </Link>
      </div>

      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search OS store..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className={styles.rightSection}>
        <div className={styles.navOption}>
          <span className={styles.lineOne}>Hello, Sign in</span>
          <Link to="/login" className={styles.lineTwo}>Account & Lists</Link>
        </div>

        <div className={styles.navOption}>
          <span className={styles.lineOne}>Returns</span>
          <Link to="/" className={styles.lineTwo}>& Orders</Link>
        </div>

        <div className={styles.cart}>
          <Link to="/cart" className={styles.cartLink}>
            🛒
            {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
            <span className={styles.cartText}>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
