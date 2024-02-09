import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        logIn: () => { set({ isLoggedIn: true }); },
        logOut: () => { set({ isLoggedIn: false }); },
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
);
