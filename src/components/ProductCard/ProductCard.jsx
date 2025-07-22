import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onWishlistToggle }) {
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={product.thumbnail} alt={product.title} className={styles.image} />
          <button
            onClick={handleWishlistClick}
            className={styles.wishlistButton}
            aria-label={product.isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {product.isInWishlist ? '💖' : '🤍'}
          </button>
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>

          <div className={styles.ratingRow}>
            <p className={styles.rating}>⭐ {product.rating} / 5</p>
            {product.rating >= 4.5 && <span className={styles.badge}>Top Rated</span>}
          </div>

          <p className={styles.price}>${product.price}</p>
          <p className={styles.stock}>In stock</p>
          <p className={styles.delivery}>Get it by <strong>Tuesday, June 18</strong></p>

          <button className={styles.cartButton}>Add to Cart</button>
        </div>
      </div>
    </Link>
  );
}
