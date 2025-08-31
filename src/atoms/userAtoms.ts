import { atom, selector } from 'recoil';
import type { User } from '../types/index'; 

// State for user list
export const usersState = atom<User[]>({
  key: 'usersState',
  default: [],
});

// State for API loading
export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

// State for API errors
export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});

// Selector for fetching users
export const fetchUsers = selector<User[]>({
  key: 'fetchUsers',
  get: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    return users;
  },
});