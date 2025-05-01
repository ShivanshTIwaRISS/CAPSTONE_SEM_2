import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
        console.error("Error fetching featured products:", err);
        setError('Failed to load featured products');
        setLoading(false);
      });
  }, []);

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Welcome to Our Store</h1>
          <p className={styles.subtitle}>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className={`${styles.button} ${styles.primaryButton}`}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        {loading ? (
          <div className={styles.loading}>Loading featured products...</div>
        ) : (
          <div className={styles.productsGrid}>
            {featuredProducts.map(product => (
              <div key={product.id} className={styles.productCard}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.title}</h3>
                  <p className={styles.price}>${product.price}</p>
                  <div className={styles.rating}>Rating: {product.rating}/5</div>
                  <Link 
                    to={`/products/${product.id}`} 
                    className={styles.viewButton}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Ready to Explore More?</h2>
        <Link to="/products" className={`${styles.button} ${styles.secondaryButton}`}>
          Browse All Products
        </Link>
      </section>
    </div>
  );
}