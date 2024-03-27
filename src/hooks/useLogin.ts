import { useMutation } from '@tanstack/react-query';
import type { LoginPayload, LoginResponse } from '@/services/authService';
import { login } from '@/services/authService';
import { type User } from '@/stores/authStore';

export const useLogin = () => {
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    LoginResponse,
    Error,
    LoginPayload,
    User
  >({
    mutationFn: login,
  });

  return { loginUser: mutate, isSuccess, isPending, isError, error, data };
};
