// src/hooks/useUsers.ts
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { usersState, loadingState, errorState, fetchUsers } from '../atoms/userAtoms';
import { User, CreateUserData } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useRecoilState(usersState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const fetchedUsers = useRecoilValue(fetchUsers);

  // Fetch users on initial load
  useEffect(() => {
    if (fetchedUsers.length > 0 && users.length === 0) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers, setUsers, users.length]);

  // Create a new user
  const createUser = async (userData: CreateUserData): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      const newUser = await response.json();
      // Generate a temporary ID for local state management
      const userWithId = { 
        ...newUser, 
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: userData.username || userData.name.toLowerCase().replace(/\s+/g, '')
      };
      setUsers(prev => [...prev, userWithId]);
      setLoading(false);
      return userWithId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  // Update an existing user
  const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      const updatedUser = await response.json();
      setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updatedUser } : user));
      setLoading(false);
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  // Delete a user
  const deleteUser = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      setUsers(prev => prev.filter(user => user.id !== id));
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};