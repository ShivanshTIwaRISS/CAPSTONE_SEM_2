import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage or start empty
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        // Add isInWishlist flag to each product based on wishlist state
        const updatedProducts = res.data.products.map(product => ({
          ...product,
          isInWishlist: wishlist.includes(product.id),
        }));
        setProducts(updatedProducts);
      })
      .catch(console.error);
  }, [wishlist]);

  // Toggle wishlist status of a product
  const handleWishlistToggle = (productId) => {
    setWishlist(prev => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      localStorage.setItem('wishlist', JSON.stringify(updated)); // persist wishlist
      return updated;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Products</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onWishlistToggle={handleWishlistToggle} 
          />
        ))}
      </div>
    </div>
  );
}
