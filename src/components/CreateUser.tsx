import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import LoadingSpinner from './LoadingSpinner';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { createUser, loading, error } = useUsers();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.name.toLowerCase().replace(/\s+/g, ''),
      };
      
      await createUser(userData);
      navigate('/');
    } catch (err) {
      // Error is handled in the hook
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 overflow-hidden mb-8">
          <div className="bg-indigo_dye-600 text-white px-6 py-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Create New User</h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="flex-1">{error}</span>
              <button className="text-red-800 hover:text-red-600">×</button>
            </div>
          </div>
        )}
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 overflow-hidden">
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-indigo_dye-700 mb-2">
                 Your Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-caribbean_current-500 transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-platinum-300 focus:border-caribbean_current-500'
                  }`}
                  placeholder="Enter user's full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.name}
                  </p>
                )}
              </div>
              
             
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-indigo_dye-700 mb-2">
                 Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-caribbean_current-500 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-platinum-300 focus:border-caribbean_current-500'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.email}
                  </p>
                )}
              </div>
              
             
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-indigo_dye-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-caribbean_current-500 transition-all duration-200 ${
                    errors.phone 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-platinum-300 focus:border-caribbean_current-500'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
            
        
            <div className="mt-8 pt-6 border-t border-platinum-200 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-platinum-300 text-jet-600 rounded-lg hover:bg-platinum-100 transition-all duration-200 font-medium flex-1 sm:flex-none order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium flex-1 sm:flex-none order-1 sm:order-2"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">+</span>
                  Create User
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-jet-500 text-sm">
            All fields marked with * are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;