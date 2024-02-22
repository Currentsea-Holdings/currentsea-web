import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload, LoginResponse } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

export const useLogin = () => {
  const { mutate, isSuccess, isPending, data, isError, error } = useMutation<
    LoginResponse,
    Error,
    LoginPayload
  >({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Successful login: ', data);
      const { setUser } = useAuthStore.getState();
      setUser(data.user);
      return data;
    },
    onError: (error) => {
      console.log('error');
    },
  });

  return { loginUser: mutate, isSuccess, isPending, isError, error, data };
};
