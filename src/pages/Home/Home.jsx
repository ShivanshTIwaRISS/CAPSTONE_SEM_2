import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=3')
      .then(res => {
        setFeaturedProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load featured products');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <h2>Featured Products</h2>
        {loading && <p className={styles.loading}>Loading featured products...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.productsGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Ready to Explore More?</h2>
        <Link to="/products" className={styles.secondaryButton}>
          Browse All Products
        </Link>
      </section>
    </div>
  );
}
