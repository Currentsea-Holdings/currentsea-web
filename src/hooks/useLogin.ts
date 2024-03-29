import { useMutation } from '@tanstack/react-query';
import type { LoginPayload, LoginResponse } from '@/services/authService';
import { login } from '@/services/authService';
import { useAuthStore, type User } from '@/stores/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    LoginResponse,
    Error,
    LoginPayload,
    User
  >({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful.');
      console.log(data);
      setUser(data.user);
    },
  });

  return { loginUser: mutate, isSuccess, isPending, isError, error, data };
};
