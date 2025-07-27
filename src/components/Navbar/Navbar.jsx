import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const handle = setTimeout(() => {
      axios
        .get(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchTerm.trim()
          )}&limit=2`
        )
        .then(res => {
          setSuggestions(res.data.products || []);
          setShowDropdown(true);
        })
        .catch(() => {
          setSuggestions([]);
        });
    }, 300);

    return () => clearTimeout(handle);
  }, [searchTerm]);

  const handleSuggestionClick = (term) => {
    setSearchTerm('');
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowDropdown(false);
      setSuggestions([]);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const onClickOutside = e => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img src="/image.png" alt="OS" />
        </Link>
      </div>

      <div className={styles.searchWrapper} ref={inputRef}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search OS store..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setShowDropdown(true)}
          />
          <button type="submit">🔍</button>
        </form>

        {showDropdown && suggestions.length > 0 && (
          <ul className={styles.suggestionsDropdown}>
            {suggestions.map(prod => (
              <li
                key={prod.id}
                onMouseDown={() => handleSuggestionClick(prod.title)}
              >
                {prod.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navOption}>
          <span className={styles.lineOne}>Hello, Sign in</span>
          <Link to="/login" className={styles.lineTwo}>Account & Lists</Link>
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
