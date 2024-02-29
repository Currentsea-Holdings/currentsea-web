import { useMutation } from '@tanstack/react-query';
import { register, LoginPayload, LoginResponse } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

export const useRegister = () => {
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    LoginResponse,
    Error,
    LoginPayload
  >({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Successful registration: ', data);
      // const { setUser } = useAuthStore.getState();
      // setUser(data.user);
      return data;
    },
    onError: (error) => {
      console.log('error');
    },
  });

  return { registerUser: mutate, isSuccess, isPending, isError, error, data };
};
