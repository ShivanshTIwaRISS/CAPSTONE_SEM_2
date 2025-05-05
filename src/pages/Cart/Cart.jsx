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
      <div className={styles.container}>
        <h1>Your Cart is Empty</h1>
        <Link to="/products" className={styles.shopLink}>Shop Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Your Shopping Cart</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className={styles.productCell}>
                <img src={item.thumbnail} alt={item.title} className={styles.productImage} />
                <span>{item.title}</span>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => decreaseQuantity(item.id)} className={styles.qtyBtn}>-</button>
                <span className={styles.qty}>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className={styles.qtyBtn}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItemFromCart(item.id)} className={styles.removeBtn}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <p>Total Items: <strong>{totalItems}</strong></p>
        <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
        <button onClick={clearCart} className={styles.clearBtn}>Clear Cart</button>
        {/* You can add a checkout button here */}
      </div>
    </div>
  );
}
