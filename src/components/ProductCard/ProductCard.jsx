import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className={styles.image} 
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.rating}>Rating: {product.rating} / 5</p>
        <Link to={`/products/${product.id}`} className={styles.viewButton}>
          View Details
        </Link>
      </div>
    </div>
  );
}
