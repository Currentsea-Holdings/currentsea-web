import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { login } from '@/services/authService';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        user: null,
        login: async (email, password) => {
          let userData: User | undefined;
          try {
            const response = await login({ email, password });
            userData = response?.user;
          } catch (error) {
            console.error('Login Error:', error);
          } finally {
            set({ isLoggedIn: true, user: userData });
          }
        },
        logOut: () => {
          set({ isLoggedIn: false });
        },
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useAuthStore);
}
