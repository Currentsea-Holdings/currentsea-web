import { OnboardingBreadcrumbs } from './components/OnboardingBreadcrumbs';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import Paypal from '@/assets/images/platform-logos/Paypal.svg';
import { BackButton } from '@/components/common/BackButton';
import { CSButton } from '@/components/common';
import { ArrowRight } from "flowbite-react-icons/outline";

export const EarningsView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={3} />
      <div className="flex h-full w-full flex-col">
        <div className="mt-20 flex items-center justify-between p-4">
          <BackButton
            route="/connect-social-media?code=_NgZPcvO_9rNXpkQCqP5_BoQqfttT20GbuOF7bUfoCM_z-Q-IvoGd12UKYOzi8PN-hbCHQKj6D0d4WXlhI_KZRLuEIuGkBHKhexrEBRJtC9nPKql-Z2kO0_0jKZ_55cuhKF3k7aRiiluvlyvKIT4mvlZrw-5IjIFiNWQvY-yawpTK5FgGQkqtYPV1Rbm6-lZMxAaQCSh8VYwlWi7BO2IBA%2A3%216388.u1&scopes=user.info.basic%2Cuser.info.stats&state=04010pqplp6a"
            className="ml-[15%]"
          />
          <h1 className="mr-[15%] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Connect Social Media
          </h1>
          <div />
        </div>
        <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
          <div className="IntegrationCards mt-10 inline-flex h-48 w-96 flex-col items-start justify-between rounded-lg bg-white p-4 shadow">
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
                  <button
                    // onClick={onClick}
                    className="flex justify-center items-center px-4 h-9 w-50 cursor-pointer rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
                  >
                    Connect account <ArrowRight className='pl-2' />
                  </button>
                  <div className="ArrowRight relative h-3 w-3" />
              </div>
            </div>
          </div>
          <form
            onSubmit={() => { navigate('/') }}
            className="flex w-full flex-col items-center justify-center p-5 mt-10"
          >
            <CSButton
              type="submit"
              className="flex h-12 w-[73%] items-center justify-center rounded-lg border bg-primary px-5"
            >
              Home
            </CSButton>
          </form>
        </div>
      </div>
    </div>
  );
};
