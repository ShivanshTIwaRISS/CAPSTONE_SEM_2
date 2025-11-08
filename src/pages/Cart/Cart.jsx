import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (!currentUser) {
      alert('You must be logged in to proceed to checkout.');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className={styles.shopLink}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        <h2>Shopping Cart</h2>
        <hr />
        {cartItems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.thumbnail} alt={item.title} className={styles.productImage} />
            <div className={styles.productDetails}>
              <h4>{item.title}</h4>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className={styles.quantityControls}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItemFromCart(item.id)} className={styles.removeBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.promoBox}>
          <h3>Have a Promo Code?</h3>
          <div className={styles.promoInputGroup}>
            <input type="text" placeholder="Enter code" className={styles.promoInput} />
            <button className={styles.applyBtn}>Apply</button>
          </div>
        </div>

        <div className={styles.cartSummary}>
          <h3>Order Summary</h3>
          <p>Items: {totalItems}</p>
          <p>Total: <strong>${totalPrice.toFixed(2)}</strong></p>
          <button onClick={handleCheckout} className={styles.proceedBtn}>
            Proceed to Checkout
          </button>

          <button onClick={clearCart} className={styles.clearBtn}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
