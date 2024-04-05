
import { OnboardingBreadcrumbs } from './components/OnboardingBreadcrumbs';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { AccountDetailsForm } from './components/AccountDetailsForm';
import { useEffect } from 'react';

export const OnboardingView = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={1} />
      <div className="flex h-full w-full flex-col">
        {user && <AccountDetailsForm user={user} />}
      </div>
    </div>
  );
};

