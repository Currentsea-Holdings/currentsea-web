import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { FormEvent, KeyboardEvent } from 'react';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useRegister } from '@/hooks/useRegister';
import { useAuthStore } from '@/stores/authStore';
import {
  type ConfirmEmailPayload,
  type ConfirmEmailResponse,
  confirmEmail,
} from '@/services/authService';
import { GoBackButton } from './components/GoBackButton';
import { CSCard } from '@/components/common';
import { Card } from 'flowbite-react';
import agencyImg from '@/assets/images/authentication/agency.png';
import creatorImg from '@/assets/images/authentication/creator.png';
import brandImg from '@/assets/images/authentication/brand.png';
import classNames from 'classnames';
import type { UserResponse } from '@/services/usersService';
import { updateUser } from '@/services/usersService';
import { useMutation } from '@tanstack/react-query';

const cardData: { type: 'Agency' | 'Brand' | 'Creator'; img: string }[] = [
  { type: 'Agency', img: agencyImg },
  { type: 'Creator', img: creatorImg },
  { type: 'Brand', img: brandImg },
];

export const EmailVerifiedView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

  return (
    <>
      <AuthSplitLayout backgroundImageUrl={backgroundImageUrl}>
        <div className="w-5/6 max-w-md space-y-4 md:space-y-6 xl:max-w-full">
          <a
            href="/"
            className="mb-4 inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="mr-2 h-12"
              src={logo}
              alt="logo"
            />
          </a>
          {<Verified />}
        </div>
      </AuthSplitLayout>
    </>
  );
};

const Verified = function () {
  const [selectedType, setSelectedType] = useState<'Agency' | 'Brand' | 'Creator' | undefined>(
    undefined,
  );

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { mutate: updateUserType, isPending } = useMutation<
    UserResponse,
    Error,
    { id: string; userType: 'Creator' | 'Agency' | 'Brand' }
  >({
    mutationFn: async ({ id, userType }) => await updateUser(id, { userType }),
    onSuccess: ({ userType }: { userType?: 'Creator' | 'Agency' | 'Brand' }) => {
      if (userType) {
        useAuthStore.getState().updateUserType(userType);
      }
      navigate('/onboarding');
    },
    onError: (error) => {
      console.error('Failed to update user type:', error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      if (selectedType && user) {
        updateUserType({ id: user.id, userType: selectedType });
      }
      console.log('User type updated successfully');
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  const handleSelectType = (userType: 'Creator' | 'Agency' | 'Brand') => {
    setSelectedType((currentType) => (currentType === userType ? undefined : userType));
  };
  return (
    <>
      <div className="flex">
        <GoBackButton />
        <div className="pb-4">
          <h1 className="leding-tight col-span-11 mb-2 font-extrabold tracking-tight text-gray-900 dark:text-white">
            Email has been verified!
          </h1>
          <h2 className="outline-primary-10 !mt-1.5 font-semibold text-gray-50 ring-inset focus:ring-2">
            Before you get started, what type of account are you creating?
          </h2>
          <div className="mt-20 flex h-96 w-full justify-items-stretch space-x-4 outline-red-200">
            {cardData.map((card) => (
              <CSCard
                key={card.type}
                className={classNames('w-full cursor-pointer text-center', {
                  'ring-2 ring-primary': selectedType === card.type,
                  'hover:ring-primary- hover:ring-1': selectedType !== card.type,
                })}
                imgSrc={card.img}
                onClick={() => {
                  handleSelectType(card.type);
                }}
              >
                <h2 className="mt-6 select-none font-bold text-dark">{card.type}</h2>
              </CSCard>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <CSButton
          type="submit"
          disabled={!selectedType}
          isProcessing={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
        >
          Set up account
        </CSButton>
      </form>
    </>
  );
};
