import React from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usersState } from '../atoms/userAtoms';
import { useUsers } from '../hooks/useUsers'; 

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const users = useRecoilValue(usersState);
   const { deleteUser } = useUsers();
  const navigate = useNavigate();
  const user = users.find(u => u.id === parseInt(id || ''));

  // ✅ Delete handler function
  const handleDelete = async (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteUser(userId);
        navigate('/'); // Redirect to home after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 p-6 max-w-md w-full text-center">
          <div className="text-6xl mb-4 text-platinum-400">❌</div>
          <h2 className="text-xl font-semibold text-jet-600 mb-2">User Not Found</h2>
          <p className="text-jet-500 mb-6">The user you're looking for doesn't exist.</p>
          <Link 
            to="/"
            className="inline-flex items-center bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            <span className="mr-2">←</span>
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">  
      
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo_dye-600 hover:text-indigo_dye-800 mb-6 transition-colors duration-200"
        >
          <span className="mr-2">←</span>
          Back to User List
        </Link>
        
        <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 overflow-hidden">
          <div className="bg-indigo_dye-600 text-white px-6 py-5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">User Details</h1>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-caribbean_current-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl text-white">👤</span>
                </div>
                <h2 className="text-xl font-semibold text-indigo_dye-700">{user.name}</h2>
                <p className="text-jet-500">@{user.username}</p>
              </div>
              <div className="bg-platinum-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo_dye-700 mb-3 flex items-center">
                  <span className="mr-2">📧</span>
                  Contact Here..
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-8 text-caribbean_current-600">📧</span>
                    <div>
                      <p className="text-sm text-jet-500">Email</p>
                      <a 
                        href={`mailto:${user.email}`} 
                        className="text-indigo_dye-600 hover:text-indigo_dye-800 transition-colors duration-200"
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="w-8 text-caribbean_current-600">📞</span>
                    <div>
                      <p className="text-sm text-jet-500">Phone</p>
                      <p className="text-indigo_dye-700">{user.phone}</p>
                    </div>
                  </div>
                  
                  {user.website && (
                    <div className="flex items-center">
                      <span className="w-8 text-caribbean_current-600">🌐</span>
                      <div>
                        <p className="text-sm text-jet-500">Website</p>
                        <a 
                          href={`https://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo_dye-600 hover:text-indigo_dye-800 transition-colors duration-200"
                        >
                          {user.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Additional Info (if available) */}
              {(user.address || user.company) && (
                <div className="bg-platinum-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-indigo_dye-700 mb-3 flex items-center">
                    <span className="mr-2">ℹ️</span>
                    Additional Information
                  </h3>
                  
                  <div className="space-y-3">
                    {user.address && (
                      <div>
                        <p className="text-sm text-jet-500">Location</p>
                        <p className="text-indigo_dye-700">
                          {user.address.street}, {user.address.city}
                        </p>
                      </div>
                    )}
                    
                    {user.company && (
                      <div>
                        <p className="text-sm text-jet-500">Company</p>
                        <p className="text-indigo_dye-700">{user.company.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-platinum-50 border-t border-platinum-200 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              to={`/edit/${user.id}`}
              className="bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
            >
              <span className="mr-2">✏️</span>
              Edit User
            </Link>

             <button
              onClick={() => handleDelete(user.id, user.name)}
              className="bg-jet-500 hover:bg-jet-600 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
            >
              <span className="mr-2">🗑️</span>
              Delete User
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDetails;