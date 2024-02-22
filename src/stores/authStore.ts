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
  setUser: (user: User) => void;
  logOut: () => void;
  isSignedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        isLoggedIn: false,
        user: null,
        setUser: (user) => {
          set({ user, isLoggedIn: true });
        },
        logOut: () => {
          set({ isLoggedIn: false });
        },
        isSignedIn: () => {
          return !!get().user;
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
