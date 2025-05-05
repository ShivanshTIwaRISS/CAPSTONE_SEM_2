import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Assuming you have this
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItemToCart } = useCart();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading product details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>Product not found</p>;

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addItemToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    // Redirect to cart or checkout page
    navigate('/cart');
  };

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

          <div className={styles.buttonGroup}>
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className={styles.buyNowBtn}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
