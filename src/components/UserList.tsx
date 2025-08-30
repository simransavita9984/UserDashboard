import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import LoadingSpinner from './LoadingSpinner';

const UserList: React.FC = () => {
  const { users, loading, error, deleteUser } = useUsers();

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteUser(id);
      } catch (err) {
        // Error is handled in the hook
      }
    }
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User List</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/user/${user.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${user.email}`} className="text-gray-600 hover:text-gray-800">
                    {user.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/edit/${user.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No users found. Create your first user!
        </div>
      )}
    </div>
  );
};

export default UserList;