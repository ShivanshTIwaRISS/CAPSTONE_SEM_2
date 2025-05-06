import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.brand}>MyStore</NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? styles.active : undefined}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Products
          </NavLink>
        </li>
        <li>
          <Link to="/cart" className={styles.cartLink} aria-label="Shopping Cart">
            <span role="img" aria-label="shopping cart" style={{ fontSize: '1.5rem' }}>
              🛒
            </span>
            {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
          </Link>
        </li>
        {/* Login Icon */}
        <li>
          <Link to="/login" className={styles.loginLink} aria-label="Login">
            <span role="img" aria-label="login" style={{ fontSize: '1.5rem' }}>
              🔐
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
