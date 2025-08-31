//./src/types/index.ts

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website?: string;
  address?: {
    street: string;
    city: string;
  };
  company?: {
    name: string;
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  username?: string;
}