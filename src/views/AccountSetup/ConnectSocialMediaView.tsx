import { DollarIcon, FacebookIcon, InstagramIcon, MouseIcon, RotateIcon } from '@/assets/icons';
import loginBackground from '@/assets/images/authentication/login-background.png';
import logo from '@/assets/logo-title-black.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SocialMedia {
    name: string;
    icon: JSX.Element;
}
const socialMediaList = [
  { name: 'Facebook', icon: <FacebookIcon /> },
  { name: 'instagram', icon: <InstagramIcon /> },
  { name: 'Dollar', icon: <DollarIcon /> },
  { name: 'Rotate', icon: <RotateIcon /> },
  { name: 'Mouse', icon: <MouseIcon /> },
  { name: 'Facebook', icon: <FacebookIcon /> },
  { name: 'instagram', icon: <InstagramIcon /> },
  { name: 'Dollar', icon: <DollarIcon /> },
  { name: 'Rotate', icon: <RotateIcon /> }
  
];

export const ConnectSocialMediaView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);

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
      <div className="flex w-3/4 flex-col items-center justify-center p-8">
      <h3 className="text-2xl font-bold text-center mb-6">Connect Social Media</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialMediaList.map((media) => (
              <div key={media.name} className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 mb-2">
                    {media.icon}
                </div>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {media.name}
                </h5>
                <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Connect account
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Next: Earnings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectSocialMediaView;
