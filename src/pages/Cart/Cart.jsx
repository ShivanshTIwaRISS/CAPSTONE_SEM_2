import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

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

      <div className={styles.cartSummary}>
        <div className={styles.summaryBox}>
          <p>Subtotal ({totalItems} items): <strong>${totalPrice.toFixed(2)}</strong></p>
          
          <Link to="/checkout" className={styles.proceedBtn}>
            Proceed to Checkout
          </Link>

          <button onClick={clearCart} className={styles.clearBtn}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
