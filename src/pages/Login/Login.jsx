import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useCart } from "../../context/CartContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addItemToCart, clearCart } = useCart(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Store user in localStorage so Cart recognizes login on Vercel
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
      }));

      const redirectPath = localStorage.getItem("redirectAfterLogin");
      const buyNowProduct = localStorage.getItem("buyNowProduct");

      if (buyNowProduct) {
        clearCart(); 
        addItemToCart(JSON.parse(buyNowProduct));
        localStorage.removeItem("buyNowProduct");
      }

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath); 
      } else {
        navigate("/"); 
      }
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Failed to log in. Please try again.");
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <img src="/image.png" alt="OS Logo" />
      </div>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign in</h2>
          {error && <p className={styles.error}>{error}</p>}

          <label htmlFor="email">Email</label>
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

          <button type="submit" className={styles.loginButton}>
            Continue
          </button>

          {/* ✅ Replaced invalid <a href="#"> links */}
          <p className={styles.conditions}>
            By continuing, you agree to OS’s{" "}
            <button type="button" className={styles.fakeLink}>Terms</button> and{" "}
            <button type="button" className={styles.fakeLink}>Privacy Policy</button>.
          </p>

          <p className={styles.help}>
            <button type="button" className={styles.fakeLink}>Need help?</button>
          </p>
        </form>
      </div>

      <div className={styles.newToAmazon}>
        <span>New to OS?</span>
        <Link to="/register" className={styles.createAccountButton}>
          Create your OS account
        </Link>
      </div>
    </div>
  );
}
