import React from 'react';
import styles from './Checkout.module.css';

export default function AddressForm() {
  return (
    <div className={styles.section}>
      <h3>Shipping Address</h3>
      <form className={styles.form}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Mobile Number" required />
        <input type="text" placeholder="Street Address" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="State" required />
        <input type="text" placeholder="ZIP Code" required />
      </form>
    </div>
  );
}
