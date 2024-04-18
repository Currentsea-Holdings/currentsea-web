import type { User} from '@/stores/authStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Paypal from '@/assets/images/platform-logos/Paypal.svg';
import { BackButton } from '@/components/common/BackButton';
import { CSButton } from '@/components/common';
import { ArrowRight } from 'flowbite-react-icons/outline';
import { useEffect, useState } from 'react';
import { getUserUserProfile } from '@/services/usersService';
import { paypalApi } from '@/api/platforms/paypalApi';
import { accessTokensApi } from '../../api/platforms/accessTokensApi';

interface EarningsProps {
  user: User;
  onBack: () => void;
  onNext: () => void;
}

export const Earnings = ({ user, onNext, onBack }: EarningsProps) => {
  const [currentEarningsId, setCurrentEarningsId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const navigate = useNavigate();

  const { id: loggedId } = user;

  const authorizePaypal = (userId: string) => async () => {
    console.log('Paypal Authorization Has Started for user:', userId);
    try {
      const authUrl = await paypalApi.getAuthUrl(userId);
      window.location.href = authUrl;
    } catch (error) {
      if (error) {
        console.error('Error onboarding PayPal account:', error);
      } else {
        console.error('Unexpected error onboarding PayPal account:', error);
      }
    }
  };

  interface EarningsConnections {
    [key: string]: boolean;
    paypal: boolean;
  }

  interface EarningsAccessTokenTypes {
    [key: string]: boolean;
    paypal: boolean;
  }

  const getInitialConnections = (): EarningsConnections => {
    const storedConnections = sessionStorage.getItem('connections');
    return storedConnections
      ? (JSON.parse(storedConnections) as EarningsConnections)
      : {
          paypal: false,
        };
  };

  const [connections, setConnections] = useState<EarningsAccessTokenTypes>(getInitialConnections());
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // this will check for current accessTokens the particular userId has already
    if (user.id) {
      accessTokensApi
        .getConnectedAccessTokens(user.id)
        .then((connectionStatuses: EarningsAccessTokenTypes) => {
          setConnections(connectionStatuses);
          setIsConnected(true);
        })
        .catch((error) => {
          console.error('Error fetching social media connections:', error);
        });
    } else {
      console.log('User is not logged in');
      navigate('/');
    }
  }, [user.id, navigate]);

  useEffect(() => {
    const status = searchParams.get('status');
    const currentEarningsId = sessionStorage.getItem('currentEarningsId');

    if (status === 'success' && currentEarningsId) {
      console.log(`${currentEarningsId} connection successful`);
      setConnections((prev) => ({ ...prev, [currentEarningsId]: true }));
      sessionStorage.removeItem('currentEarningsId');
    }

    if (status === 'error') {
      console.error(`${currentEarningsId} connection failed`);
    }

    sessionStorage.setItem('connections', JSON.stringify(connections));
  }, [searchParams, connections]);

  return (
    <>
      <div className="mx-[15%] mt-20 flex items-center justify-between p-4">
        <BackButton route={onBack} />
        <h1 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Earnings
        </h1>
        <div />
      </div>
      <div className="flex w-[50%] flex-1 flex-col items-center justify-start self-center overflow-y-auto p-4">
        <div className="IntegrationCards mt-10 inline-flex h-48 w-full flex-col items-start justify-between rounded-lg bg-white p-4 shadow">
          <div className="Header inline-flex items-center justify-start gap-5 self-stretch">
            <div className="LogoName flex h-7 shrink grow basis-0 items-center justify-start gap-4 pr-72">
              <img
                alt="Paypal Logo"
                src={Paypal}
              />
              <div className="Mailchimp font-['Montserrat'] text-base font-semibold leading-none text-zinc-900">
                PayPal
              </div>
            </div>
          </div>
          <div className="Description self-stretch font-['Montserrat'] text-sm font-normal leading-tight text-zinc-600">
            PayPal is the faster, safer way to send and receive money or make an online payment.
          </div>
          <div className="Buttons inline-flex items-start justify-start gap-2 self-stretch">
            <div className="CurrentseaButton flex h-9 shrink grow basis-0 items-start justify-start gap-2">
              {!isConnected ? (
                <CSButton
                  onClick={authorizePaypal(loggedId)}
                  className="w-50 flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
                >
                  Connect account <ArrowRight className="pl-2" />
                </CSButton>
              ) : (
                <h2 style={{ color: 'green', fontSize: '14px' }}>Connected!</h2>
              )}
              <div className="ArrowRight relative h-3 w-3" />
            </div>
          </div>
        </div>
        <form
          onSubmit={() => {
            onNext();
          }}
          className="mt-10 flex w-full flex-col items-center justify-center"
        >
          <CSButton
            type="submit"
            size="lg"
            className="flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5"
          >
            Home
          </CSButton>
        </form>
      </div>
    </>
  );
};
