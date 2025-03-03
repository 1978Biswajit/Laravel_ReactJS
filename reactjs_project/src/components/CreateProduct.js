// src/components/CreateProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      setError('Please fill out both name and price');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
        name,
        price
      });
      console.log('Product created', response.data);
      navigate('/');
    } catch (err) {
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input 
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Product Price</label>
          <input 
            type="number"
            className="border p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button 
            type="submit" 
            className={`bg-blue-500 text-white p-2 rounded-md ${loading && 'opacity-50'}`} 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
