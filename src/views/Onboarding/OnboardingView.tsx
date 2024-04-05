
import { OnboardingBreadcrumbs } from './components/OnboardingBreadcrumbs';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { AccountDetailsForm } from './components/AccountDetailsForm';

export const OnboardingView = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/');
  }

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={1} />
      <div className="flex h-full w-full flex-col">
        {user && <AccountDetailsForm user={user} />}
      </div>
    </div>
  );
};

