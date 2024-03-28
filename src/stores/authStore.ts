import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { login } from '@/services/authService';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  userType?: 'Creator' | 'Agency' | 'Brand';
}

interface AuthStore {
  isLoggedIn: () => boolean;
  user: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
  confirmUserEmail: () => void;
  updateUserType: (userType: 'Creator' | 'Agency' | 'Brand') => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        isLoggedIn: () => !!get().user,
        user: null,
        setUser: (user) => {
          set({ user });
        },
        logOut: () => {
          set({ user: null });
        },
        confirmUserEmail: () => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, emailVerified: true },
            });
          }
        },
        updateUserType: (userType) => {
          const currentUser = get().user;
          if (currentUser) {
            set({ user: { ...currentUser, userType } });
          }
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
