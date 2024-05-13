import { useEffect } from 'react';

import { userProfileApi } from '@/api/userProfileApi';
import { useUserProfile } from '@/hooks/useUserProfile';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { getUserUserProfile } from '@/services/usersService';
import { useAuthStore } from '@/stores/authStore';

import AgencyProfileCreationSteps from './components/AgencyUserProfileSetup/AgencyProfileCreationSteps';
import BrandProfileCreationSteps from './components/BrandUserProfileSetup/BrandProfileCreationSteps';
import CreatorProfileCreationSteps from './components/CreatorUserProfileSetup/CreatorProfileCreationSteps';
import { AgencyDashboard } from './dashboards/AgencyDashboard';
import { BrandDashboard } from './dashboards/BrandDashboard';
import { CreatorDashboard } from './dashboards/CreatorDashboard';

interface HomeViewProps {
  hasFullProfile?: boolean;
}

export const HomeView = ({ hasFullProfile }: HomeViewProps) => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const userType = useAuthStore((state) => state.user?.userType);
  const { profileCompleted, isProfileCreationStepsOpen, setIsProfileCreationStepsOpen } =
    useUserProfile();

  // Will check for current user that's logged in but will check it against hasFullUserProfile submitted
  useEffect(() => {
    if (userProfile && user) {
      const fetchProfileData = async () => {
        console.log('userType signed on:', userType);
        const profile = await getUserUserProfile(user.id);
        // const userProfileStatus = await userProfileApi.getUserProfileStatus(userProfile.id);
        // const userProfileComplete = userProfileStatus.profileCompleted;
        const userProfileComplete = profile?.userProfileCompleted;
        console.log('has user completed frull profile?', userProfileComplete);
        if (profile && !userProfileComplete) {
          setIsProfileCreationStepsOpen(true);
        }
      };
      fetchProfileData().catch((error: unknown) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, profileCompleted, userProfile, setIsProfileCreationStepsOpen]);

  return (
    <DashboardLayout>
      {userType === 'Creator' && isProfileCreationStepsOpen && !profileCompleted && (
        <CreatorProfileCreationSteps />
      )}
      {userType === 'Brand' && isProfileCreationStepsOpen && !profileCompleted && (
        <BrandProfileCreationSteps />
      )}
      {userType === 'Agency' && isProfileCreationStepsOpen && !profileCompleted && (
        <AgencyProfileCreationSteps />
      )}
      <h1 className="my-2">Home</h1>
      {user?.userType && <Dashboard userType={user.userType} />}
    </DashboardLayout>
  );
};

interface DashboardProps {
  userType: 'Creator' | 'Brand' | 'Agency';
}

const Dashboard = ({ userType }: DashboardProps) => {
  switch (userType) {
    case 'Creator':
      return <CreatorDashboard />;
    case 'Brand':
      return <BrandDashboard />;
    case 'Agency':
      return <AgencyDashboard />;
    default:
      return <CreatorDashboard />;
  }
};
