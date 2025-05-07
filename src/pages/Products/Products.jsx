import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {

    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {

        const updatedProducts = res.data.products.map(product => ({
          ...product,
          isInWishlist: wishlist.includes(product.id),
        }));
        setProducts(updatedProducts);
      })
      .catch(console.error);
  }, [wishlist]);


  const handleWishlistToggle = (productId) => {
    setWishlist(prev => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      localStorage.setItem('wishlist', JSON.stringify(updated)); 
      return updated;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Products</h1>
      <div className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
        }}
      > 
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
