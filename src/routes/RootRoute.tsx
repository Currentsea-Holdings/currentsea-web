import { useAuthStore } from '@/stores/authStore';
import { Navigate } from "react-router-dom";

export const RootRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (typeof isLoggedIn === "boolean" && isLoggedIn === true) {
    return <Navigate to="/dashboard/home" />;
  } else {
    return <Navigate to="/signup" />;
  }
};
