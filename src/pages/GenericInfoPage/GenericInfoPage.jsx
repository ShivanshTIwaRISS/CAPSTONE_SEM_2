import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./GenericInfoPage.module.css";

export default function GenericInfoPage() {
  const { page } = useParams();
  const contentMap = {
    about: {
      title: "About OS",
      description:
        "Welcome to OS Store! We are committed to providing the best shopping experience with top-quality products and excellent customer service. Our mission is to make online shopping easy and enjoyable for everyone.",
    },
    careers: {
      title: "Careers",
      description:
        "Join the OS team and help shape the future of online shopping! We offer exciting roles in tech, marketing, logistics, and more. Visit our Careers page regularly to stay updated on open positions.",
    },
    press: {
      title: "Press Releases",
      description:
        "Stay up to date with the latest announcements, partnerships, and product launches from OS Store. We believe in transparency and sharing our growth journey with the world.",
    },
    devices: {
      title: "OS Devices",
      description:
        "Explore our range of OS devices designed to enhance your shopping experience and make your life easier with smart technology solutions.",
    },
    sell: {
      title: "Sell on OS",
      description:
        "Become a seller on OS and reach thousands of customers every day. Our seller program gives you powerful tools to manage inventory, pricing, and orders effortlessly.",
    },
    affiliate: {
      title: "Affiliate Program",
      description:
        "Earn money by promoting OS products through our affiliate program. Sign up today and start earning commission on every sale generated through your links.",
    },
    advertise: {
      title: "Advertise Your Products",
      description:
        "Boost your product sales with OS Ads. Our advertising tools help you target the right audience and maximize your ROI.",
    },
    account: {
      title: "Your Account",
      description:
        "Manage your profile, orders, payment methods, and more all from one place. Your account is the hub for all your OS activities.",
    },
    returns: {
      title: "Returns Centre",
      description:
        "Easily return or exchange products with our hassle-free returns policy. Visit the Returns Centre to start your process.",
    },
    help: {
      title: "Help & Support",
      description:
        "Need assistance? Our Help Center provides FAQs, troubleshooting guides, and contact options to get the support you need quickly.",
    },
  };

  const pageData = contentMap[page] || {
    title: "Page Not Found",
    description:
      "Oops! The page you are looking for does not exist. Please go back to the homepage.",
  };

  return (
    <div className={styles.pageContainer}>
      <h1>{pageData.title}</h1>
      <p>{pageData.description}</p>

      <Link to="/" className={styles.backButton}>
        ← Back to Home
      </Link>
    </div>
  );
}
