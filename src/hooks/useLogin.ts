import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import type { AuthRequestDto, LoginResponseDto, UserProfile } from '@/types';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    LoginResponseDto,
    Error,
    AuthRequestDto
  >({
    mutationFn: login,
    onSuccess: ({ user, userProfile }) => {
      console.log('Login successful.');
      setUser(user);
      setUserProfile(userProfile as UserProfile);
    },
  });

  return { loginUser: mutate, isSuccess, isPending, isError, error, data };
};
