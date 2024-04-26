import classNames from 'classnames';
import Icons, { ChartMixedDollarIcon, RotateIcon, MouseIcon } from '@/assets/icons';
import { CSUpcomingTasks } from '@/views/Home/CSUpcomingTasks';
import { CSActiveCampaigns } from '@/views/Home/CSActiveCampaigns';
import { CSButton, CSCard } from '@/components/common';
import { CSCardAnalytics } from '@/views/Home/CSCardAnalytics';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Footer } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { usersApi } from '@/api/usersApi';
import { useAuthStore, type User } from '@/stores/authStore';
import { getUserUserProfile } from '@/services/usersService';
import ProfileCreationModal from '@/views/UserProfileSetup/ProfileCreationModal';
import { useNavigate } from 'react-router-dom';
import { LuWaves } from 'react-icons/lu';
import { ArrowRight } from 'flowbite-react-icons/outline';
import CreatorInfoForm from '../UserProfileSetup/CreatorInfoForm';
import ProfileCreationSteps from '../UserProfileSetup/ProfileCreationSteps';
import { useUserProfile } from '@/hooks/useUserProfile';
import { userProfileApi } from '@/api/userProfileApi';

interface HomeProps {
  className?: string;
  hasFullProfile?: boolean;
}

export const Home = ({ className, hasFullProfile, ...props }: HomeProps) => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const navigate = useNavigate();
  const [hasFullUserProfile, setHasFullUserProfile] = useState<boolean>(false);
  const [showEmptyState, setShowEmptyState] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState(1);
  const { profileCompleted, isProfileCreationStepsOpen, setIsProfileCreationStepsOpen } =
    useUserProfile();

  // Will check for current user that's logged in but will check it against hasFullUserProfile submitted
  useEffect(() => {
    if (!userProfile || !user) {
      navigate('/login');
    } else {
      const fetchProfileData = async () => {
        const profile = await getUserUserProfile(user.id);
        const userProfileStatus = await userProfileApi.getUserProfileStatus(userProfile.id);
        const userProfileComplete = userProfileStatus.profileCompleted;
        if (profile && userProfileComplete) {
          setShowEmptyState(false);
        } else if (profile && !userProfileComplete) {
          setIsProfileCreationStepsOpen(true);
          setShowEmptyState(true);
        }
      };
      fetchProfileData().catch((error: unknown) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, profileCompleted]);

  const viewCalendar = () => {
    console.log('viewCalendar clicked');
    // navigate('/calendar'); //TODO: This route/view/screen or api call etc still has to be made.
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <DashboardLayout>
      {isProfileCreationStepsOpen && !profileCompleted && <ProfileCreationSteps />}
      <h1 className="my-2">Home</h1>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        {!showEmptyState ? (
          <>
            <CSCardAnalytics
              icon={ChartMixedDollarIcon}
              amount="$950"
              label="Earnings"
            />
            <CSCardAnalytics
              icon={RotateIcon}
              amount="123"
              label="Conversions"
            />
            <CSCardAnalytics
              icon={MouseIcon}
              amount="23"
              label="Affiliate Link Clicks"
            />
          </>
        ) : (
          <>
            <CSCardAnalytics
              icon={ChartMixedDollarIcon}
              amount="$0"
              label="Earnings"
            />
            <CSCardAnalytics
              icon={RotateIcon}
              amount="0"
              label="Conversions"
            />
            <CSCardAnalytics
              icon={MouseIcon}
              amount="0"
              label="Affiliate Link Clicks"
            />
          </>
        )}
      </div>
      {!showEmptyState ? (
        <>
          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CSCard
              className="max-h-[436px]"
              title="Today's Schedule"
            >
              <div className="flex w-full flex-col items-start gap-1 rounded-lg bg-[#edfafa] px-2 py-1">
                <div className="text-[#075c68]">12:30-15:00</div>
                <div className="text-lg font-medium leading-[27px] text-[#065d69]">
                  Flowbite Meet
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-1 rounded-lg bg-[#edfafa] px-2 py-1">
                <div className="text-[#075c68]">12:30-15:00</div>
                <div className="text-lg font-medium leading-[27px] text-[#065d69]">
                  Flowbite Meet
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-1 rounded-lg bg-[#edfafa] px-2 py-1">
                <div className="text-[#075c68]">12:30-15:00</div>
                <div className="text-lg font-medium leading-[27px] text-[#065d69]">
                  Flowbite Meet
                </div>
              </div>
            </CSCard>
            <CSUpcomingTasks title="Upcoming Tasks" />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CSCard
              className="h-[436px]"
              title="Today's Schedule"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg">
                <LuWaves
                  size={170}
                  className="mt-18"
                  color={'#2972fa'}
                />
                <p>No events today</p>
                <CSButton
                  onClick={viewCalendar}
                  className="w-50 mb-8 mt-3 flex h-9 cursor-pointer items-center justify-center rounded-lg text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
                  style={{ border: '1px solid #2972fa', color: '#2972fa', background: 'white' }}
                >
                  View calendar <ArrowRight className="pl-2" />
                </CSButton>
              </div>
            </CSCard>
            <CSCard
              title="Upcoming Task"
              className="flex w-full flex-col xl:max-w-full"
              // style={{ width: '54vw' }}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg">
                <LuWaves
                  size={170}
                  className="mt-18"
                  color={'#2972fa'}
                />
                <p>No upcoming tasks</p>
              </div>
            </CSCard>
          </div>
        </>
      )}
      {!showEmptyState ? (
        <>
          <div
            className={classNames(
              'mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3',
            )}
          >
            <CSActiveCampaigns title="Active Campaigns" />
          </div>
        </>
      ) : null}
    </DashboardLayout>
  );
};
