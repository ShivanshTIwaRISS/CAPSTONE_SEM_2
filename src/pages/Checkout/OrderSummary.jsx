import React from 'react';
import styles from './Checkout.module.css';

export default function OrderSummary() {
  return (
    <div className={styles.summaryCard}>
      <h3>Order Summary</h3>
      <p>Items: 3</p>
      <p>Total: ₹3,499.00</p>
      <button className={styles.placeOrderBtn}>Place Your Order</button>

      <div className={styles.securityNote}>
        <span role="img" aria-label="secure">🔒</span> Secure transaction
      </div>
    </div>
  );
}
