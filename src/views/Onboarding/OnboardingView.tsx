import { OnboardingSteps } from './components/OnboardingSteps';
import { useAuthStore } from '@/stores/authStore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AccountSetupForm, ConnectSocialMedia, Earnings } from '.';
import { useEffect } from 'react';
import { getUserUserProfile } from '@/services/usersService';

export const OnboardingView = () => {
  const user = useAuthStore((state) => state.user);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const userProfile = useAuthStore((state) => state.userProfile);

  const navigate = useNavigate();
  const { step } = useParams();
  const stepNumber = Number(step);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch User Profile data on step 1
  useEffect(() => {
    if (stepNumber === 1) {
      const fetchUserProfileData = async () => {
        const userProfileData = await getUserUserProfile(user?.id);
        setUserProfile(userProfileData);
      };

      fetchUserProfileData().catch((error: unknown) => {
        console.error(error);
      });
    }
  }, [setUserProfile, stepNumber, user?.id]);

  // Callbacks for navigating through steps
  const goToPreviousStep = () => {
    navigate(`/onboarding/${stepNumber - 1}`);
  };
  const goToNextStep = () => {
    navigate(`/onboarding/${stepNumber + 1}`);
  };

  // Render current step component based on step number
  const getCurrentStepComponent = () => {
    if (user) {
      switch (stepNumber) {
        case 1:
          return (
            <AccountSetupForm
              user={user}
              onNext={goToNextStep}
            />
          );
        case 2:
          return (
            <ConnectSocialMedia
              user={user}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          );
        case 3:
          return (
            <Earnings
              user={user}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
            />
          );
        case 4:
          if (userProfile) {
            return (
              <Navigate
                to="/"
                replace={true}
              />
            );
          } else {
            return (
              <Navigate
                to="/onboarding/1"
                replace={true}
              />
            );
          }
        default:
          return (
            <Navigate
              to="/onboarding/1"
              replace={true}
            />
          );
      }
    }
    return (
      <Navigate
        to="/login"
        replace={true}
      />
    );
  };

  return (
    <div className="flex h-screen">
      <OnboardingSteps stepNum={stepNumber} />
      <div className="flex h-full w-full flex-col">{getCurrentStepComponent()}</div>
    </div>
  );
};
