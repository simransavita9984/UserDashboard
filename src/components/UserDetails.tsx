import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usersState } from '../atoms/userAtoms';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const users = useRecoilValue(usersState);
  const user = users.find(u => u.id === parseInt(id || ''));

  if (!user) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        User not found. <Link to="/" className="text-blue-600 hover:text-blue-800">Return to user list</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        &larr; Back to User List
      </Link>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Username:</span> {user.username}</p>
                <p><span className="font-medium">Email:</span> <a href={`mailto:${user.email}`} className="text-blue-600">{user.email}</a></p>
                <p><span className="font-medium">Phone:</span> {user.phone}</p>
                {user.website && <p><span className="font-medium">Website:</span> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">{user.website}</a></p>}
              </div>
            </div>
            
            {user.address && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Address</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Street:</span> {user.address.street}</p>
                  <p><span className="font-medium">City:</span> {user.address.city}</p>
                </div>
              </div>
            )}
            
            {user.company && (
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Company</h2>
                <p><span className="font-medium">Name:</span> {user.company.name}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <Link
            to={`/edit/${user.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Edit User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;