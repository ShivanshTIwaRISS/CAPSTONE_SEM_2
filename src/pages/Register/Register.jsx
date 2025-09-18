import React, { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Firebase Registration Error:', err.code, err.message);
      setError(err.message); 
    }
  };

  if (success) {
    return (
      <div className={styles.successPage}>
        <div className={styles.checkmark}>✓</div>
        <h2>Registration Successful!</h2>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <img src="/image.png" alt="OS Logo" />
      </div>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Create account</h2>
          {error && <p className={styles.error}>{error}</p>}

          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="At least 6 characters"
          />

          <label htmlFor="confirmPassword">Re-enter password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.registerButton}>
            Create your OS account
          </button>

          <p className={styles.conditions}>
            By creating an account, you agree to OS’s <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>

          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
