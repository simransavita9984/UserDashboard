// src/hooks/useUsers.ts
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { usersState, loadingState, errorState } from '../atoms/userAtoms';
import type { User, CreateUserData } from '../types/index';

export const useUsers = () => {
  const [users, setUsers] = useRecoilState(usersState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);

  // Fetch users on initial load
  useEffect(() => {
    const fetchInitialUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (users.length === 0) {
      fetchInitialUsers();
    }
  }, [setUsers, setLoading, setError, users.length]);

  // Create a new user
  const createUser = async (userData: CreateUserData): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to create user...Try Again Later');

      const newUser = await response.json();
      const userWithId = {
        ...newUser,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: userData.username || userData.name.toLowerCase().replace(/\s+/g, ''),
      };
      setUsers(prev => [userWithId, ...prev]);
      return userWithId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing user
  const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
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

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
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
