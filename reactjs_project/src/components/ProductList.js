// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products?page=${page}`);
        setProducts(response.data.data); // assuming response contains a 'data' array
        setTotalPages(response.data.meta.last_page); // assuming response contains metadata
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-md">
            <div className="flex justify-between">
              <span>{product.name} - ${product.price}</span>
              <Link to={`/edit/${product.id}`} className="text-blue-500">Edit</Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Previous
        </button>
        <span className="self-center">{`Page ${page} of ${totalPages}`}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page === totalPages} 
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Next
        </button>
      </div>
      <div className="mt-4">
        <Link to="/create" className="bg-green-500 text-white p-2 rounded-md">
          Create New Product
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
