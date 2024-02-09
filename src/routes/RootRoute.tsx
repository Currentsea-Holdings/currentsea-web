import { useAuthStore } from '@/stores/authStore';
import { Navigate } from "react-router-dom";

export const RootRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/dashboard/home" />;
  } else {
    return <Navigate to="/signup" />;
  }
};
