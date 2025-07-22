import React from 'react';
import styles from './Checkout.module.css';

export default function PaymentMethod() {
  return (
    <div className={styles.section}>
      <h3>Payment Method</h3>
      <label><input type="radio" name="payment" /> Credit/Debit Card</label>
      <label><input type="radio" name="payment" /> UPI</label>
      <label><input type="radio" name="payment" /> Cash on Delivery</label>
    </div>
  );
}
