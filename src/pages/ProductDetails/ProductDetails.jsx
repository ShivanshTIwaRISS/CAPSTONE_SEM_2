import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading product details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>Product not found</p>;

  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.backLink}>← Back to Products</Link>
      <div className={styles.detailsGrid}>
        <div className={styles.imageWrapper}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className={styles.productImage} 
          />
        </div>
        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.rating}>Rating: {product.rating} / 5</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
