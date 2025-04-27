import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Products</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img 
              src={product.thumbnail} 
              alt={product.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Rating: {product.rating}/5</p>
            <Link to={`/products/${product.id}`} style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}