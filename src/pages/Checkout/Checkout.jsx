import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { auth, db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [confirmCod, setConfirmCod] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid = address.name && address.street && address.city && address.zip;
  const isPaymentValid =
    (paymentMethod === 'card' && cardDetails.number && cardDetails.expiry && cardDetails.cvv) ||
    (paymentMethod === 'upi' && upiId) ||
    paymentMethod === 'cod';

  const handlePlaceOrder = async () => {
    if (!isAddressValid || !isPaymentValid) return;
    if (paymentMethod === 'cod' && !confirmCod) {
      alert('Please confirm your Cash on Delivery order.');
      setConfirmCod(true);
      return;
    }

    try {
      if (!auth.currentUser) {
        alert("You must be logged in to place an order.");
        return;
      }

      await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser.uid,
        items: cartItems,
        total: totalPrice,
        address,
        paymentMethod,
        createdAt: serverTimestamp(),
      });

      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Error saving order:", error);
      alert("❌ Failed to place order. Please try again.");
    }
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
        <div className={styles.section}>
          <h3>Shipping Address</h3>
          <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} />
          <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} />
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} />
          <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} />
        </div>
        <div className={styles.section}>
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>
        <div className={styles.section}>
          <h3>Payment Method</h3>
          <select value={paymentMethod} onChange={(e) => { setPaymentMethod(e.target.value); setConfirmCod(false); }}>
            <option value="">Select Payment Method</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          {paymentMethod === 'card' && (
            <>
              <input placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
              <input placeholder="Expiry Date (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
              <input placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
            </>
          )}

          {paymentMethod === 'upi' && (
            <input placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
          )}

          {paymentMethod === 'cod' && confirmCod && (
            <p className={styles.codConfirm}>✅ COD Confirmed. Ready to place the order.</p>
          )}
        </div>
        <div className={styles.section}>
          <button
            className={styles.placeOrderBtn}
            onClick={handlePlaceOrder}
            disabled={!isAddressValid || !isPaymentValid}
          >
            Place Order
          </button>
          {(!isAddressValid || !isPaymentValid) && (
            <p className={styles.warning}>Please complete address and payment details to place the order.</p>
          )}
        </div>
      </div>
    </div>
  );
}
