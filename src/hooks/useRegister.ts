import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import type { AuthRequestDto, RegisterResponseDto, User } from '@/types';

export const useRegister = () => {
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    RegisterResponseDto,
    Error,
    AuthRequestDto,
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
