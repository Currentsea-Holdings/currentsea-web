import { useEffect, useState } from 'react';
import { socialLogoArray } from '@/assets/images/platform-logos/platform-logos-data.tsx';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { SocialMediaConnectContainer } from './components/SocialMediaConnectContainer';
import { CSButton } from '@/components/common';
import { BackButton } from '@/components/common/BackButton';
import type { User} from '@/stores/authStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tikTokApi } from '@/api/platforms/tikTokApi';
import { youtubeApi } from '@/api/platforms/youtubeApi';
import { twitchApi } from '@/api/platforms/twitchApi';
import { snapChatApi } from '@/api/platforms/snapchatApi';
import { xApi } from '@/api/platforms/xApi';
import { getUserUserProfile } from '@/services/usersService';
import { pinterestApi } from '@/api/platforms/pinterestApi';
import { linkedInApi } from '@/api/platforms/linkedInApi';
import { accessTokensApi } from '@/api/platforms/accessTokensApi';
import type { ConnectedAccessTokenTypes } from '@/api/platforms/accessTokensApi';

interface ConnectSocialMediaProps {
  user: User;
  onBack: () => void;
  onNext: () => void;
}

export const ConnectSocialMedia = ({ user, onNext, onBack }: ConnectSocialMediaProps) => {
  const [codeParams, setCodeParams] = useState<string>('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [isConnected, setIsConnected] = useState<Record<string, boolean>>({});
  const [currentSocialMediaId, setCurrentSocialMediaId] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const { id: loggedId } = user;
  // const [loggedId, setLoggedId] = useState<string>('');
  // useEffect(() => {
  //   const fetchUserProfileData = async () => {
  //     await getUserUserProfile(user?.id);
  //     setLoggedId(user?.id as string);
  //   };

  //   fetchUserProfileData().catch((error: unknown) => {
  //     console.error(error);
  //   });
  // }, [user?.id]);

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
    paypal: false;
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
          paypal: false,
        };
  };

  const [connections, setConnections] =
    useState<ConnectedAccessTokenTypes>(getInitialConnections());
  const [searchParams] = useSearchParams();

  useEffect(() => { // this will check for current accessTokens the particular userId has already
    if (user.id) {
      accessTokensApi
        .getConnectedAccessTokens(user.id)
        .then((connectionStatuses: ConnectedAccessTokenTypes) => {
          setConnections(connectionStatuses);
        })
        .catch((error: unknown) => {
          console.error('Error fetching social media connections:', error);
        });
    } else {
      console.log('User is not logged in');
      navigate('/');
    }
  }, [user.id, navigate]);

  useEffect(() => {
    const status = searchParams.get('status');
    const socialMediaId = sessionStorage.getItem('currentSocialMediaId');

    if (status === 'success' && socialMediaId) {
      console.log(`${socialMediaId} connection successful`);
      setConnections((prev) => ({ ...prev, [socialMediaId]: true }));
      sessionStorage.removeItem('currentSocialMediaId');
    }

    if (status === 'error') {
      console.error(`${socialMediaId} connection failed`);
    }

    sessionStorage.setItem('connections', JSON.stringify(connections));
  }, [searchParams, connections]);

  const handleSocialMediaConnect = (socialMediaId: string, loggedId: string) => async () => {
    setCurrentSocialMediaId(socialMediaId);
    sessionStorage.setItem('currentSocialMediaId', socialMediaId);
    try {
      let authorizationResponse;
      if (socialMediaId === 'tiktok') {
        // ********************************************************** TIKTOK ********************************* //
        authorizationResponse = await tikTokApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'youtube') {
        // ********************************************************** YOUTUBE ********************************* //
        authorizationResponse = await youtubeApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'twitch') {
        // ********************************************************** TWITCH ********************************* //
        authorizationResponse = await twitchApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'snapchat') {
        // ********************************************************** SNAPCHAT ********************************* //
        authorizationResponse = await snapChatApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'x') {
        // ********************************************************** X TWITTER ********************************* //
        console.log('Connect Twitter Account executed');
        authorizationResponse = await xApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'pinterest') {
        // ********************************************************** PINTEREST********************************* //
        console.log('Connect Pinterest Account executed');
        authorizationResponse = await pinterestApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'linkedin') {
        // ********************************************************** LINKEDIN ********************************* //
        console.log('Connect LinkedIn Account executed');
        authorizationResponse = await linkedInApi.authorize(loggedId);
        window.location.href = authorizationResponse;
      } else if (socialMediaId === 'facebook') {
        console.log('Connect Facebook Account executed');
      } else if (socialMediaId === 'instagram') {
        console.log('Connect Instagram Account executed');
      }
    } catch (error) {
      console.error('Failed to initiate connection:', error);
    }
  };

  return (
    <>
      <div className="mx-[15%] mt-20 flex items-center justify-between p-4">
        <BackButton route={onBack} />
        <h1 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Connect Social Media
        </h1>
        <div />
      </div>
      <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {socialLogoArray.map(({ id, name, Icon, isAvailable, isDisabled }) => (
            <SocialMediaConnectContainer
              key={id}
              name={name}
              Icon={Icon}
              isAvailable={isAvailable}
              isDisabled={isDisabled}
              onClick={handleSocialMediaConnect(id, loggedId)}
              codeParams={codeParams}
              setCodeParams={setCodeParams}
              isConnected={connections[id]}
              setIsConnected={() => {
                setIsConnected((prev) => ({ ...prev, [id]: true }));
              }}
            />
          ))}
        </div>
        <form
          onSubmit={() => {
            onNext();
          }}
          className="flex w-full flex-col items-center justify-center p-5"
        >
          <CSButton
            type="submit"
            size={'lg'}
            className="flex h-12 w-[73%] items-center justify-center rounded-lg border bg-primary px-5"
          >
            Next: Earnings
          </CSButton>
        </form>
      </div>
    </>
  );
};
