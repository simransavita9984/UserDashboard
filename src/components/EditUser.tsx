import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useRecoilValue } from 'recoil';
import { usersState } from '../atoms/userAtoms';
import { useUsers } from '../hooks/useUsers';
import LoadingSpinner from './LoadingSpinner';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useRecoilValue(usersState);
  const { updateUser, loading, error } = useUsers();
  
  const user = users.find(u => u.id === parseInt(id || ''));
  
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

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

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
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      
      await updateUser(user.id, userData);
      
      // Show success message
      setSuccessMessage('User updated successfully!');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      // Error is handled in the hook
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 p-6 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4 text-platinum-400">❌</div>
            <h2 className="text-xl font-semibold text-jet-600 mb-2">User Not Found</h2>
            <p className="text-jet-500 mb-6">The user you're trying to edit doesn't exist.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Return to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 overflow-hidden mb-8">
          <div className="bg-indigo_dye-600 text-white px-6 py-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Edit User</h1>
            <p className="text-indigo_dye-100 mt-2">Update user information</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6 animate-fadeIn">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span className="flex-1">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-lg mb-6 animate-fadeIn">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="flex-1">{error}</span>
            </div>
          </div>
        )}
        
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 overflow-hidden">
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6">
            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-indigo_dye-700 mb-2">
                  Full Name *
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
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-indigo_dye-700 mb-2">
                  Email Address *
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
              
              {/* Phone Field */}
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
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-platinum-200 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-platinum-300 text-jet-600 rounded-lg hover:bg-platinum-100 transition-all duration-200 font-medium flex-1 sm:flex-none order-2 sm:order-1"
              >
               Back
              </button>
              <button
                type="submit"
                className="bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium flex-1 sm:flex-none order-1 sm:order-2"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">💾</span>
                  Update User
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;