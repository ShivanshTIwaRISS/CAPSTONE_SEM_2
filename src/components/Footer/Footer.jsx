import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.backToTop} onClick={() => window.scrollTo(0, 0)}>
        Back to top
      </div>

      <div className={styles.linkSection}>
        <div>
          <h4>Get to Know Us</h4>
          <ul>
            <li>About OS</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>OS Devices</li>
          </ul>
        </div>

        <div>
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div>
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on OS</li>
            <li>Affiliate Program</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} OS Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
