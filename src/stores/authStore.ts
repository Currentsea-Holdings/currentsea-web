import type { User, UserProfile } from '@/types';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: () => boolean;
  user: User | null;
  userProfile: UserProfile | null;
  setUser: (user: User) => void;
  setUserProfile: (profile: UserProfile | undefined) => void;
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
        userProfile: null,
        setUser: (user) => {
          set({ user });
        },
        setUserProfile: (userProfile) => {
          if (userProfile) {
            set({ userProfile });
          } else {
            set({ userProfile: null });
          }
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
