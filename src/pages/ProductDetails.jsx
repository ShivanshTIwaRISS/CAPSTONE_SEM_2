import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/products" style={{ display: 'inline-block', marginBottom: '20px' }}>
        ← Back to Products
      </Link>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={product.thumbnail} 
            alt={product.title}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1>{product.title}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${product.price}</p>
          <p>Rating: {product.rating}/5</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
          <button style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}