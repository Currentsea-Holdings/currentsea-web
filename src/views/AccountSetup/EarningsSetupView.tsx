import loginBackground from '@/assets/images/authentication/login-background.png';
import logo from '@/assets/logo-title-black.png';
import { IconPayPal } from '@/assets/socialMediaIcons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface SocialMedia {
  name: string;
  icon: JSX.Element;
}

export const EarningsSetupView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    // handle your submit
  };

  return (
    //Left Panel
    <div className="flex h-screen">
      <div
        className="w-full bg-cover bg-center bg-no-repeat p-4 md:w-1/3"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative mt-12 min-h-[45%] w-5/6 rounded-lg bg-white p-8 text-center shadow-md">
            {/* Logo */}
            <img
              src={logo}
              alt="CurrentSea logo"
              className="md:w-30 lg:w-30 xl:w-30 mx-auto -mt-4 mb-8 h-auto w-32 max-w-xs"
            />

            <h2 className="mb-0 ml-2 text-left text-xl font-semibold text-black">Account set up</h2>
            <p className="mb-4 ml-2 text-left text-sm">Start earning in 3 easy steps!</p>

            <div
              className={`relative ml-2 text-left text-sm ${currentStep >= 1 ? ' text-blue-600' : 'text-gray-600'}`}
            >
              <div className="mb-2 flex items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center border ${currentStep >= 1 ? '  border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'} mr-2 rounded-full`}
                >
                  {currentStep > 1 ? '✓' : '1'} {/* Replace 1 with a tick if past this step */}
                </div>
                <span className={currentStep == 1 ? 'font-semibold' : 'font-normal'}>
                  Creator Info
                </span>
              </div>
              {/* Line */}
              <div
                className={`border-l ${currentStep >= 2 ? 'border-blue-600' : 'border-gray-600'} absolute`}
                style={{ height: '2.7rem', left: '0.7rem', top: '1.6rem' }}
              ></div>

              <div className="mb-2 mt-12 flex items-center">
                <div
                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${currentStep >= 2 ? 'border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'}`}
                >
                  {currentStep > 2 ? '✓' : '2'}
                </div>
                <span className={currentStep >= 2 ? 'font-semibold' : 'font-normal text-gray-600'}>
                  Social Media
                </span>
              </div>
              {/* Line */}
              <div
                className={`border-l ${currentStep >= 3 ? 'border-blue-600' : 'border-gray-600'} absolute`}
                style={{ height: '2.7rem', left: '0.7rem', top: '6.2rem' }}
              ></div>

              <div className="mt-12 flex items-center">
                <div
                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${currentStep >= 3 ? 'border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'}`}
                >
                  3
                </div>
                <span className={currentStep >= 3 ? 'font-semibold' : 'font-normal text-gray-600'}>
                  Earnings Set up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex h-2/3 w-3/4 flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="mb-20 text-2xl font-bold leading-tight text-gray-900">Earnings Set up</h2>

          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <div className=" flex items-center space-x-4 mb-6">
              {/* Icon for PayPal - replace with actual icon */}
              <div className=" text-white">
                <IconPayPal className=""></IconPayPal>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
              </div>
            </div>
            <div className="flex  mb-6">
              <p className="text-xs text-gray-600">
                PayPal is the faster, safer way to send and receive money or make an online
                payment.
              </p>
            </div>
            
            <button
              type="button"
              className="w-half flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              onClick={() => {
                /* Trigger PayPal Connect Logic */
              }}
            >
              Connect account
            </button>
          </div>
          <div className="mt-6 w-full  text-center">
            {' '}
            {/* Ensure the container is full-width and account for any padding */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-300 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsSetupView;
