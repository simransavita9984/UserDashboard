import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import LoadingSpinner from './LoadingSpinner';

const UserList: React.FC = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  // Memoize users data to prevent unnecessary re-renders
  const memoizedUsers = useMemo(() => users, [users]);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteUser(id);
        // Show success message
        setDeleteSuccess(`User "${name}" has been deleted successfully!`);
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
      } catch (err) {
        // Error is handled in the hook
        setDeleteSuccess(null);
      }
    }
  };

  if (loading && memoizedUsers.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-lg mb-6">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-indigo_dye-600 text-white rounded-lg shadow-lg mb-8 p-6">
        <h1 className="text-3xl font-bold text-center mb-2">User Management Application</h1>
        <p className="text-indigo_dye-100 text-center">Manage your users efficiently and effectively</p>
      </div>

      {/* Success Message */}
      {deleteSuccess && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 animate-fadeIn">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">✓</span>
            <span>{deleteSuccess}</span>
            <button
              onClick={() => setDeleteSuccess(null)}
              className="ml-auto text-red-800 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Check if users array is empty */}
      {memoizedUsers.length === 0 ? (
        /* Empty State - This will show when all users are deleted */
        <div className="text-center py-16 bg-white rounded-xl shadow-xl border border-platinum-300">
          <div className="text-6xl mb-4 text-platinum-400">👥</div>
          <h3 className="text-xl font-semibold text-jet-600 mb-2">No Users Found</h3>
          <p className="text-jet-500 mb-6">Get started by creating your first user</p>
          <Link 
            to="/create" 
            className="inline-flex items-center bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <span className="mr-2">+</span>
            Create First User
          </Link>
        </div>
      ) : (
        /* Users List - This will show when users exist */
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden lg:block bg-white rounded-xl shadow-xl border border-platinum-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-platinum-200">
                <thead className="bg-platinum-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-indigo_dye-700 uppercase tracking-wider">
                      User Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-indigo_dye-700 uppercase tracking-wider">
                      User Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-indigo_dye-700 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-indigo_dye-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-platinum-200">
                  {memoizedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-platinum-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`/user/${user.id}`} 
                          className="text-indigo_dye-600 hover:text-indigo_dye-800 font-semibold transition-colors duration-200 inline-flex items-center"
                        >
                          <span className="mr-2">👤</span>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`mailto:${user.email}`} 
                          className="text-jet-600 hover:text-caribbean_current-600 transition-colors duration-200 inline-flex items-center"
                        >
                          <span className="mr-2">📧</span>
                          {user.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-jet-600">
                        <span className="inline-flex items-center">
                          <span className="mr-2">📞</span>
                          {user.phone}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/edit/${user.id}`}
                            className="bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1 text-sm"
                          >
                            <span>✏️</span>
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="bg-jet-500 hover:bg-jet-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1 text-sm"
                          >
                            <span>🗑️</span>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View (Visible only on mobile) */}
          <div className="lg:hidden space-y-4">
            {memoizedUsers.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Separate UserCard component to prevent re-renders of entire list
const UserCard = React.memo(({ user, onDelete }: { user: any; onDelete: (id: number, name: string) => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-platinum-300 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-3">
        <div>
          <Link 
            to={`/user/${user.id}`} 
            className="text-indigo_dye-600 hover:text-indigo_dye-800 font-semibold text-lg flex items-center"
          >
            <span className="mr-2">👤</span>
            {user.name}
          </Link>
        </div>
        
        <div className="flex items-center text-jet-600">
          <span className="mr-2">📧</span>
          <a href={`mailto:${user.email}`} className="hover:text-caribbean_current-600 truncate">
            {user.email}
          </a>
        </div>
        
        <div className="flex items-center text-jet-600">
          <span className="mr-2">📞</span>
          <span className="truncate">{user.phone}</span>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Link
            to={`/edit/${user.id}`}
            className="flex-1 bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white px-3 py-2 rounded-lg text-center transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <span>✏️</span>
            <span>Edit</span>
          </Link>
          <button
            onClick={() => onDelete(user.id, user.name)}
            className="flex-1 bg-jet-500 hover:bg-jet-600 text-white px-3 py-2 rounded-lg text-center transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <span>🗑️</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';

export default UserList;