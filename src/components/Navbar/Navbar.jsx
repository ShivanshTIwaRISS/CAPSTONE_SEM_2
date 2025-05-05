import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
