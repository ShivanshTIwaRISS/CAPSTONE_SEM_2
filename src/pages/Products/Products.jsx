import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function Products() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState('');

  const PRODUCTS_PER_PAGE = 20;

  // ✅ Fixed: queryParams moved inside effect to avoid ESLint CI build error
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('search') || '';
    setSearchTerm(term);
  }, [location.search]);

  const fetchProducts = useCallback(() => {
    let url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`;
    if (searchTerm.trim()) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`;
    }

    axios.get(url).then(res => {
      const fetched = res.data.products || [];
      let sorted = [...fetched];

      if (sortKey === 'price') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortKey === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      }

      const updated = sorted.map(product => ({
        ...product,
        isInWishlist: wishlist.includes(product.id),
      }));

      setProducts(updated);
      const total = res.data.total || 0;
      setTotalPages(Math.ceil(total / PRODUCTS_PER_PAGE));
    });
  }, [page, searchTerm, sortKey, wishlist]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortKey]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleSortChange = e => {
    setSortKey(e.target.value);
  };

  const handleWishlistToggle = productId => {
    setWishlist(prev => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const renderPaginationButtons = () => {
    const maxVisibleButtons = 5;
    const half = Math.floor(maxVisibleButtons / 2);
    let startPage = Math.max(1, page - half);
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    const buttons = [];

    if (page > 1) {
      buttons.push(
        <button key="first" onClick={() => setPage(1)} className={styles.pageButton}>&laquo;</button>,
        <button key="prev" onClick={() => setPage(page - 1)} className={styles.pageButton}>&lsaquo;</button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`${styles.pageButton} ${page === i ? styles.activePage : ''}`}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages) {
      buttons.push(
        <button key="next" onClick={() => setPage(page + 1)} className={styles.pageButton}>&rsaquo;</button>,
        <button key="last" onClick={() => setPage(totalPages)} className={styles.pageButton}>&raquo;</button>
      );
    }

    return buttons;
  };

  return (
    <div className={styles.container}>
      <h1>Our Products</h1>

      <div className={styles.controls}>
        <div className={styles.sortWrapper}>
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortKey}
            onChange={handleSortChange}
            className={styles.sortDropdown}
          >
            <option value="">Select</option>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {searchTerm && (
        <div className={styles.activeFilters}>
          <span>Search: <strong>{searchTerm}</strong></span>
        </div>
      )}

      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} onWishlistToggle={handleWishlistToggle} />
          </div>
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <span>Page: {page}</span>
        <div className={styles.pageButtons}>
          {renderPaginationButtons()}
        </div>
      </div>

      {products.length === 0 && (
        <div className={styles.noResults}>No products found for "{searchTerm}"</div>
      )}
    </div>
  );
}
