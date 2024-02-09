import { api } from '@/api/api';
import { useAuthStore } from '@/stores/authStore';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/login', {
      email,
      password,
    }, {withCredentials: true,});
    console.log(response.data);
    if (response.status === 200) {
      useAuthStore.setState({isLoggedIn: true});
      console.log('logged in');
      console.log(response);
      return response;
    }
    else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
export const profile = async () => {
  try {
    const response = await api.get('auth/profile', {withCredentials: true});
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// email: 'john@doe.coms',
// password: 'Password1@',