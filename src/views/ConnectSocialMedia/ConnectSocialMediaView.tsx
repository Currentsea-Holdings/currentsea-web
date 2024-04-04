import { useState } from 'react';
import { socialLogoArray } from '@/assets/images/platform-logos/platform-logos-data.tsx';
import { SocialMediaConnectLayout } from '@/layouts/SocialMediaConnectLayout';
import { LeftArrowIconBlack } from '@/assets/icons.tsx';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { SocialMediaConnectContainer } from './components/SocialMediaConnectContainer';
import { OnboardingView } from '../Onboarding/OnboardingView';
import { OnboardingBreadcrumbs } from '../Onboarding/components/OnboardingBreadcrumbs';
import { CSButton } from '@/components/common';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

export const ConnectSocialMediaView = () => {
  const user = useAuthStore((state) => state.user);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const navigate = useNavigate();
  if (!user) {
    navigate('/');
  }

  const goBack = () => {
    navigate('/onboarding');
  };

  const handleSocialMediaConnect = (socialMediaId: string) => () => {
    if (socialMediaId === 'facebook') {
      console.log('Connect Facebook Account executed');
    } else if (socialMediaId === 'instagram') {
      console.log('Connect Instagram Account executed');
    } else if (socialMediaId === 'linkedin') {
      console.log('Connect LinkedIn Account executed');
    } else if (socialMediaId === 'pinterest') {
      console.log('Connect Pinterest Account executed');
    } else if (socialMediaId === 'snapchat') {
      console.log('Connect Snapchat Account executed');
    } else if (socialMediaId === 'tiktok') {
      console.log('Connect Tiktok Account executed');
    } else if (socialMediaId === 'twitch') {
      console.log('Connect Twitch Account executed');
    } else if (socialMediaId === 'x') {
      console.log('Connect X Account executed');
    } else if (socialMediaId === 'youtube') {
      console.log('Connect Youtube Account executed');
    }
  };

  const onSubmit = (data: string) => {
    const socialData = data;
    navigate('/earnings');

    // submitCreateUserProfile(
    //   { userId: id as string, ...socialData },
    //   {
    //     onSuccess: (data) => {
    //       console.log('User Profile created successfully.');
    //       navigate('/earnings');
    //     },
    //     onError: (error) => {
    //       console.error('error:', error);
    //     },
    //   },
    // );
  };

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={2} />
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between p-4">
          <LeftArrowIconBlack onClick={goBack} />
          <h1 className="mr-[15%] text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
            Connect Social Media
          </h1>
          <div />
        </div>
        <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {socialLogoArray.map(({ id, name, Icon }) => (
              <SocialMediaConnectContainer
                key={id}
                name={name}
                Icon={Icon}
                onClick={handleSocialMediaConnect(id)}
              />
            ))}
          </div>
          <form
            onSubmit={() => onSubmit}
            className="flex w-full flex-col items-center justify-center p-5"
          >
            <CSButton
              type="submit"
              className="flex h-12 w-[73%] items-center justify-center rounded-lg border bg-primary px-5"
            >
              Next: Earnings
            </CSButton>
          </form>
        </div>
      </div>
    </div>
  );
};
