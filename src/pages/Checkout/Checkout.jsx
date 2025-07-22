import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Address state
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

  // Handle change
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Check if all fields are filled
  const isAddressValid = address.name && address.street && address.city && address.zip;

  const handlePlaceOrder = () => {
    if (!isAddressValid) return;
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className={styles.orderPlaced}>
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for shopping with us.</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.checkoutGrid}>

        {/* Address Form */}
        <div className={styles.section}>
          <h3>Shipping Address</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={address.zip}
            onChange={handleChange}
          />
        </div>

        {/* Order Summary */}
        <div className={styles.section}>
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <h4>Total: ₹{totalPrice.toFixed(2)}</h4>

          <button
            className={styles.placeOrderBtn}
            onClick={handlePlaceOrder}
            disabled={!isAddressValid}
          >
            Place Order
          </button>

          {!isAddressValid && (
            <p className={styles.warning}>Please fill all address fields to place the order.</p>
          )}
        </div>

        {/* Security Badges */}
        <div className={styles.section}>
          <h3>🔒 Secure Checkout</h3>
          <p>SSL secured • 100% Safe payments • Trusted platform</p>
        </div>

      </div>
    </div>
  );
}
