import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { login } from '@/services/authService';

interface User {
  id: string;
  email: string;
}

interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        user: null,
        login: async (email, password) => {
          let userData: User | undefined;
          try {
            const res = await login({ email, password });
            userData = res.user;
          } catch (err) {
            console.error('Login Error:', err);
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
