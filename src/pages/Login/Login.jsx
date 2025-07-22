import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (email === 'user@example.com' && password === 'password123') {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        {/* Replace this src with your actual logo file if local */}
        <img src="/image.png" alt="OS Logo" />
      </div>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign in</h2>
          {error && <p className={styles.error}>{error}</p>}

          <label htmlFor="email">Email or mobile phone number</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.loginButton}>Continue</button>

          <p className={styles.conditions}>
            By continuing, you agree to OS’s <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>

          <p className={styles.help}><a href="#">Need help?</a></p>
        </form>
      </div>

      <div className={styles.newToAmazon}>
        <span>New to OS?</span>
        <Link to="/register" className={styles.createAccountButton}>Create your OS account</Link>
      </div>
    </div>
  );
}
