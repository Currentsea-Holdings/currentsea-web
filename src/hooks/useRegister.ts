import { useMutation } from '@tanstack/react-query';
import type { RegisterPayload, RegisterResponse } from '@/services/authService';
import { register } from '@/services/authService';
import { type User } from '@/stores/authStore';

export const useRegister = () => {
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    RegisterResponse,
    Error,
    RegisterPayload,
    User
  >({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Successful registration: ', data);
    },
    onError: (error) => {
      console.log('error');
    },
  });

  return { registerUser: mutate, isSuccess, isPending, isError, error, data };
};
