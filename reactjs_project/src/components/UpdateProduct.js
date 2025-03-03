import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams(); // This will capture the product ID from the URL

  useEffect(() => {
    // Fetch product data by ID when the component is mounted
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        setProduct(response.data); // Set the product data to state
      } catch (err) {
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation for empty fields
    if (!product.name || !product.price) {
      setError('Please fill out all fields');
      return;
    }

    // Check if price is a valid number
    if (isNaN(product.price) || product.price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    try {
      setLoading(true);
      // Send PUT request to update the product
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        {
          name: product.name,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log('Product updated successfully:', response.data);
      navigate('/products'); // Redirect to product listing page
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      
      {loading && <p>Loading product data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter product price"
          />
        </div>

        <div>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg">
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>

      <div className="mt-4">
        <button
          onClick={() => navigate('/products')}
          className="text-gray-500 underline"
        >
          Go back to Product List
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
