import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortKey, setSortKey] = useState('');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const observer = useRef();

  const fetchProducts = useCallback(() => {
    let url = `https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`;
    if (searchTerm.trim()) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=20&skip=${(page - 1) * 20}`;
    }

    axios.get(url).then(res => {
      const fetched = res.data.products || [];

      if (fetched.length === 0) {
        setHasMore(false);
        return;
      }

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

      setProducts(prev => [...prev, ...updated]);
    });
  }, [page, searchTerm, sortKey, wishlist]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm, sortKey]);

  useEffect(() => {
    if (hasMore) {
      fetchProducts();
    }
  }, [fetchProducts, hasMore]);

  const lastProductRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

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
        {products.map((product, idx) => {
          const isLast = idx === products.length - 1;
          return (
            <div key={product.id} ref={isLast ? lastProductRef : null}>
              <ProductCard product={product} onWishlistToggle={handleWishlistToggle} />
            </div>
          );
        })}
      </div>

      <div className={styles.paginationInfo}>Page: {page}</div>

      {hasMore && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
}
