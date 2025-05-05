import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onWishlistToggle }) {
  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop bubbling to Link
    onWishlistToggle(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.cardLink} aria-label={`View details for ${product.title}`}>
      <div className={styles.card}>
        <button 
          onClick={handleWishlistClick}
          className={styles.wishlistButton}
          aria-label={product.isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{ color: product.isInWishlist ? 'red' : 'gray' }}
        >
          {product.isInWishlist ? '❤️' : '🤍'}
        </button>

        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className={styles.image} 
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.rating}>Rating: {product.rating}/5</p>
        </div>
      </div>
    </Link>
  );
}
