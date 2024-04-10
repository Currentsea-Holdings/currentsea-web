import { useEffect, useState } from 'react';
import { socialLogoArray } from '@/assets/images/platform-logos/platform-logos-data.tsx';
import { SocialMediaConnectLayout } from '@/layouts/SocialMediaConnectLayout';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { SocialMediaConnectContainer } from './components/SocialMediaConnectContainer';
import { OnboardingView } from '../Onboarding/OnboardingView';
import { OnboardingBreadcrumbs } from '../Onboarding/components/OnboardingBreadcrumbs';
import { CSButton } from '@/components/common';
import { BackButton } from '@/components/common/BackButton';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tikTokApi } from '@/views/ConnectSocialMedia/api/tiktok/tikTokApi';
import { youtubeApi } from '@/views/ConnectSocialMedia/api/youtube/youtubeApi';
import { twitchApi } from '@/views/ConnectSocialMedia/api/twitch/twitchApi';
import { snapChatApi } from '@/views/ConnectSocialMedia/api/snapchat/snapchatApi';

export const ConnectSocialMediaView = () => {
  const user = useAuthStore((state) => state.user);
  const [codeParams, setCodeParams] = useState<string>('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [isConnected, setIsConnected] = useState<Record<string, boolean>>({});
  const [currentSocialMediaId, setCurrentSocialMediaId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

  /* TODO: NEED TO FIGURE OUT HOW TO PASS URL AND PARAMS FROM POP
  UP WINDOW TO ORIGINAL BROWSER USER IS CONNECTING FROM 
  
  
  PLEASE SCROLL TO BOTTOM FOR CURRENT CODE
  
  */

  // interface PopupMessageData {
  //   code?: string;
  //   source: string;
  // }

  //   useEffect(() => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const code = queryParams.get('code');
  //     const openerWindow = window.opener as Window;

  //     if (code && window.opener) {
  //       openerWindow.postMessage(
  //         { code: code, source: 'social-auth-popup' },
  //         '*',
  //       );
  //         window.close();
  //     }
  // }, []);

  //   const handlePopup = (url: string) => {
  //     return new Promise<string | null>((resolve, reject) => {
  //         const popup = window.open(url, 'social-auth-popup', 'width=600,height=700,scrollbars=no');

  //         if (!popup) {
  //             reject(new Error('Unable to open popup'));
  //             return;
  //         }

  //         const messageHandler = (event: MessageEvent<PopupMessageData>) => {
  //             if (event.origin === '*' && event.data.source === 'social-auth-popup' && event.data.code) {
  //                 resolve(event.data.code);
  //                 window.removeEventListener('message', messageHandler);
  //                 popup.close();
  //             }
  //         };

  //         window.addEventListener('message', messageHandler, false);
  //     });
  // };

  // const handleSocialMediaConnect = (socialMediaId: string) => async () => {
  //   try {
  //     if (socialMediaId === 'youtube') {
  //       console.log('Connect Youtube Account executed');
  //       const authorizationUrl = await youtubeApi.authorize();
  //       await handlePopup(authorizationUrl);
  //       // const code = new URLSearchParams(window.location.search).get('code');
  //       // console.log('code in handleSocialMediaConnect:', code);
  //       if (codeParams) {
  //         console.log('codeParams in handleSocialMediaConnect:', codeParams);
  //         setIsConnected((prevState) => ({ ...prevState, [socialMediaId]: true }));
  //         console.log(`${socialMediaId} successfully authorized with code:`, codeParams);
  //       } else {
  //         setIsConnected((prevState) => ({ ...prevState, [socialMediaId]: false }));
  //         console.log(`${socialMediaId} authorization failed or cancelled.`);
  //       }
  //     }
  //     // ...
  //   } catch (error) {
  //     console.error('Failed to initiate connection:', error);
  //   }

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
  // };

  /**
    Frontend (User clicks connect) → 
    Social Platform (User authorizes) → 
    Backend (/callback endpoint processes the authorization) →
    Frontend (User sees the result of the connection attempt).
   */

  interface SocialMediaConnections {
    [key: string]: boolean;
  }

  interface SocialMediaConnections {
    tiktok: boolean;
    youtube: boolean;
    twitch: boolean;
    facebook: boolean;
    instagram: boolean;
    linkedin: boolean;
    pinterest: boolean;
    snapchat: boolean;
    x: boolean;
  }

  const getInitialConnections = (): SocialMediaConnections => {
    const storedConnections = sessionStorage.getItem('connections');
    return storedConnections
      ? (JSON.parse(storedConnections) as SocialMediaConnections)
      : {
          tiktok: false,
          youtube: false,
          twitch: false,
          facebook: false,
          instagram: false,
          linkedin: false,
          pinterest: false,
          snapchat: false,
          x: false,
        };
  };

  const [connections, setConnections] = useState(getInitialConnections());
  const [searchParams] = useSearchParams();

  const saveAccessToken = (platform: string, accessToken: string) => {
    console.log('platform and accessToken in saveAccessToken:', {
      platform: platform,
      accessToken: accessToken,
    });
    localStorage.setItem(`${platform}_accessToken`, accessToken);
  };

  // const getAccessToken = (platform) => {
  //   return localStorage.getItem(`${platform}_accessToken`);
  // };

  useEffect(() => {
    const status = searchParams.get('status');
    const accessToken = searchParams.get('token');
    const socialMediaId = sessionStorage.getItem('currentSocialMediaId');

    if (status === 'success' && accessToken && socialMediaId) {
      console.log(`${socialMediaId} connection successful`);
      saveAccessToken(socialMediaId, accessToken);
      setConnections((prev) => ({
        ...prev,
        [socialMediaId]: true,
      }));
      sessionStorage.removeItem('currentSocialMediaId');
    }

    if (status === 'error') {
      console.error(`${socialMediaId} connection failed`);
    }

    sessionStorage.setItem('connections', JSON.stringify(connections));
  }, [searchParams, connections]);

  const handleSocialMediaConnect = (socialMediaId: string) => async () => {
    setCurrentSocialMediaId(socialMediaId);
    sessionStorage.setItem('currentSocialMediaId', socialMediaId);
    try {
      let authorizationResponse;
      if (socialMediaId === 'tiktok') {
        // ********************************************************** TIKTOK ********************************* //
        authorizationResponse = await tikTokApi.authorize();
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'youtube') {
        // ********************************************************** YOUTUBE ********************************* //
        authorizationResponse = await youtubeApi.authorize();
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'twitch') {
        // ********************************************************** TWITCH ********************************* //
        authorizationResponse = await twitchApi.authorize();
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'snapchat') {
        // ********************************************************** SNAPCHAT ********************************* //
        authorizationResponse = await snapChatApi.authorize();
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'facebook') {
        console.log('Connect Facebook Account executed');
      } else if (socialMediaId === 'instagram') {
        console.log('Connect Instagram Account executed');
      } else if (socialMediaId === 'linkedin') {
        console.log('Connect LinkedIn Account executed');
      } else if (socialMediaId === 'pinterest') {
        console.log('Connect Pinterest Account executed');
      } else if (socialMediaId === 'x') {
        console.log('Connect X Account executed');
      }
    } catch (error) {
      console.error('Failed to initiate connection:', error);
    }
  };

  const onSubmit = (data: string) => {
    const socialData = data;
    navigate('/earnings');
  };

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={2} />
      <div className="flex h-full w-full flex-col">
        <div className="mt-20 flex items-center justify-between p-4">
          <BackButton
            route="/onboarding"
            className="ml-[15%]"
          />
          <h1 className="mr-[15%] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
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
                codeParams={codeParams}
                setCodeParams={setCodeParams}
                isConnected={connections[id]}
                // isConnected={id === 'tiktok' && !!tiktokCode}
                setIsConnected={() => {
                  setIsConnected((prev) => ({ ...prev, [id]: true }));
                }}
              />
            ))}
          </div>
          <form
            onSubmit={() => {
              navigate('/earnings');
            }}
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
