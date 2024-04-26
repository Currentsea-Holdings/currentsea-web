import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { userProfileApi } from '@/api/userProfileApi';
import Icons, { ChartMixedDollarIcon, MouseIcon, RotateIcon } from '@/assets/icons';
import { useUserProfile } from '@/hooks/useUserProfile';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { getUserUserProfile } from '@/services/usersService';
import { useAuthStore, type User } from '@/stores/authStore';

import { CSActiveCampaigns } from './components/CSActiveCampaigns';
import { CSCalendarWidget } from './components/CSCalendarWidget';
import { CSCardAnalytics } from './components/CSCardAnalytics';
import { CSUpcomingTasks } from './components/CSUpcomingTasks';
import ProfileCreationSteps from './UserProfileSetup/ProfileCreationSteps';

interface HomeViewProps {
  hasFullProfile?: boolean;
}

export const HomeView = ({ hasFullProfile }: HomeViewProps) => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const [hasFullUserProfile, setHasFullUserProfile] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { profileCompleted, isProfileCreationStepsOpen, setIsProfileCreationStepsOpen } =
    useUserProfile();

  // Will check for current user that's logged in but will check it against hasFullUserProfile submitted
  useEffect(() => {
    if (userProfile && user) {
      const fetchProfileData = async () => {
        const profile = await getUserUserProfile(user.id);
        const userProfileStatus = await userProfileApi.getUserProfileStatus(userProfile.id);
        const userProfileComplete = userProfileStatus.profileCompleted;
        if (profile && !userProfileComplete) {
          setIsProfileCreationStepsOpen(true);
        }
      };
      fetchProfileData().catch((error: unknown) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, profileCompleted, userProfile, setIsProfileCreationStepsOpen]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const earnings = 0;
  const conversions = 0;
  const affiliateLinkClicks = 0;

  interface CalendarItem {
    time: string;
    label: string;
  }

  const calendarItems: CalendarItem[] = [
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
  ];

  interface Task {
    title: string;
  }

  const upcomingTasks: Task[] = [
    // {
    //   title: 'Task 1',
    // },
    // {
    //   title: 'Task 2',
    // },
    // {
    //   title: 'Task 3',
    // },
    // {
    //   title: 'Task 4',
    // },
    // {
    //   title: 'Task 5',
    // },
    // {
    //   title: 'Task 6',
    // },
  ];

  interface Campaign {
    title: string;
    brand: string;
  }

  const activeCampaigns: Campaign[] = [
    // {
    //   title: 'Campaign Name',
    //   brand: 'Brand Name',
    // },
    // {
    //   title: 'Campaign Name 2',
    //   brand: 'Brand Name',
    // },
    // {
    //   title: 'Campaign Name 3',
    //   brand: 'Brand Name',
    // },
  ];

  return (
    <DashboardLayout>
      {isProfileCreationStepsOpen && !profileCompleted && <ProfileCreationSteps />}
      <h1 className="my-2">Home</h1>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSCardAnalytics
          icon={ChartMixedDollarIcon}
          amount={`$${earnings}`}
          label="Earnings"
        />
        <CSCardAnalytics
          icon={RotateIcon}
          amount={`${conversions}`}
          label="Conversions"
        />
        <CSCardAnalytics
          icon={MouseIcon}
          amount={`${affiliateLinkClicks}`}
          label="Affiliate Link Clicks"
        />
      </div>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CSCalendarWidget calendarItems={calendarItems} />
        <CSUpcomingTasks
          title="Upcoming Tasks"
          tasks={upcomingTasks}
        />
      </div>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSActiveCampaigns
          title="Active Campaigns"
          campaigns={activeCampaigns}
        />
      </div>
    </DashboardLayout>
  );
};
