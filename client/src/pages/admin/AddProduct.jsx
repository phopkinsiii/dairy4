// src/pages/admin/AddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useUserContext } from '../../contexts/UserContext';

const AddProduct = () => {
  const { state } = useUserContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'blueberries',
    imageSrc: '',
    imageAlt: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = state.user?.token;

      const response = await axiosInstance.post('/products', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`✅ Product created: ${response.data.newProduct.name}`);
      navigate('/manage-products');
    } catch (error) {
      console.error('❌ Product creation error:', error);
      setError(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Add New Product</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}

      <form
        onSubmit={handleSubmit}
        className='space-y-4 bg-white p-6 shadow-lg rounded-lg'
      >
        <InputField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <InputField
          label="Product Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
        />

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-1'>Category</label>
          <select
            name='category'
            className='w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
            value={product.category}
            onChange={handleChange}
          >
            <option value='blueberries'>Blueberries</option>
            <option value='apples'>Apples</option>
            <option value='dairy'>Dairy Products</option>
            <option value='goats'>Goats for Sale</option>
          </select>
        </div>

        <InputField
          label="Image URL"
          name="imageSrc"
          value={product.imageSrc}
          onChange={handleChange}
        />

        <InputField
          label="Alternate Image Text"
          name="imageAlt"
          value={product.imageAlt}
          onChange={handleChange}
        />

        <button
          type='submit'
          className='w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition-all'
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div className='mb-4'>
    <label htmlFor={name} className='block text-gray-700 font-medium mb-1'>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className='w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
      required
    />
  </div>
);

export default AddProduct;
