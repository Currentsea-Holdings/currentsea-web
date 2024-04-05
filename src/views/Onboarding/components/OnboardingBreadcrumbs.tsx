import loginBackground from '@/assets/images/authentication/login-background.png';
import logo from '@/assets/logo-title-black.png';
import classNames from 'classnames';
import { Fragment } from 'react';

const steps = ['Creator Info', 'Social Media', 'Earnings Set up'];

export const OnboardingBreadcrumbs = ({ stepNum }: { stepNum: number }) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat p-4 md:w-1/2"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mt-12 w-5/6 rounded-lg bg-white p-8 text-center shadow-md">
          {/* Logo */}
          <img
            src={logo}
            alt="CurrentSea logo"
            className="md:w-30 lg:w-30 xl:w-30 mx-auto -mt-4 mb-8 h-auto w-32 max-w-xs"
          />

          <h2 className="mb-0 ml-2 text-left text-xl font-semibold text-black">Account set up</h2>
          <p className="mb-4 ml-2 text-left text-sm">Start earning in 3 easy steps!</p>

          <div className="relative ml-2 text-left text-sm">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <div
                  className="mb-12 flex items-center"
                >
                  <div
                    className={classNames(
                      'mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-dark',
                      {
                        'border-primary text-primary': stepNum === index + 1,
                      },
                    )}
                  >
                    {index + 1}
                  </div>
                  <h3
                    className={classNames('text-base font-bold leading-tight', {
                      'text-primary': stepNum === index + 1,
                    })}
                  >
                    {step}
                  </h3>
                </div>
                {index!== steps.length - 1 && (
                <div
                  className="absolute border-l border-gray-600"
                  style={{
                    height: '2.7rem',
                    left: '0.7rem',
                    top: index === 0 ? '1.6rem' : index === 1 ? '6.2rem' : '',
                  }}
                ></div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
