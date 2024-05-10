import 'react-international-phone/style.css';

import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';

import { CSButton } from '@/components';
import { ProfileImageUploader } from '@/components/ProfileImageUploader';
import {
  createUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from '@/services/userProfileService';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

import type { User } from '@/stores/authStore';
import type { CreateUserProfile, UpdateUserProfile } from '@/services/userProfileService';
import type { UserProfile } from '@/stores/authStore';
import type { IState } from 'country-state-city';
interface AccountSetupFormProps {
  user: User;
  onNext: () => void;
}

interface AccountSetupFormFields {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  profilePicture: File | null;
}

export const AccountSetupForm = ({ user, onNext }: AccountSetupFormProps) => {
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const userProfile = useAuthStore((state) => state.userProfile);
  const { id, userType } = user as { id: string; userType: 'Creator' | 'Brand' | 'Agency' };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<AccountSetupFormFields>({
    defaultValues: {
      profilePicture: null,
      firstName: userProfile?.firstName ?? '',
      lastName: userProfile?.lastName ?? '',
      companyName: userProfile?.companyName ?? '',
      phoneNumber: userProfile?.phoneNumber ?? '',
      city: userProfile?.city ?? '',
      state: userProfile?.state ?? '',
      country: userProfile?.country ?? 'US',
    },
  });

  const phoneNumber = watch('phoneNumber');

  const countries = Country.getAllCountries();
  const selectedCountry = watch('country');

  const [states, setStates] = useState<IState[]>([]);

  // triggers based on new selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);

      const userProfileState = userProfile?.state || '';
      if (fetchedStates.find((state) => state.isoCode === userProfileState)) {
        setValue('state', userProfileState);
      } else {
        setValue('state', '');
      }
    }
  }, [selectedCountry, userProfile?.state, setValue]);

  // trigers when state list is updated
  useEffect(() => {
    const userProfileState = userProfile?.state || '';
    if (states.find((state) => state.isoCode === userProfileState)) {
      setValue('state', userProfileState);
    } else {
      setValue('state', '');
    }
  }, [states, userProfile?.state, setValue]);

  const { mutate: submitCreateUserProfile, isPending: isCreateProfilePending } = useMutation<
    UserProfile,
    Error,
    CreateUserProfile
  >({ mutationFn: createUserProfile });

  const { mutate: submitUpdateUserProfile, isPending: isUpdateProfilePending } = useMutation<
    UserProfile,
    Error,
    UpdateUserProfile
  >({ mutationFn: updateUserProfile });

  const onSubmit = (data: AccountSetupFormFields) => {
    const { profilePicture, ...profileData } = data;

    if (userProfile) {
      submitUpdateUserProfile(
        { id: userProfile.id, ...profileData },
        {
          onSuccess: async (data: UserProfile) => {
            console.log('User Profile updated successfully.');
            setUserProfile(data);
            await uploadProfilePicture({ id: userProfile.id, profilePicture });
            onNext();
          },
          onError: (error) => {
            console.error('error:', error);
          },
        },
      );
    } else {
      submitCreateUserProfile(
        { userId: id, ...data },
        {
          onSuccess: (data: UserProfile) => {
            console.log('User Profile created successfully.');
            setUserProfile(data);
            onNext();
          },
          onError: (error) => {
            console.error('error:', error);
          },
        },
      );
    }
  };

  return (
    <>
      <div className="mt-20 flex items-center justify-center p-4">
        <h1 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Let&apos;s start with the basics...
        </h1>
      </div>
      <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10 bg-white p-10"
        >
          <ProfileImageUploader
            control={control}
            setValue={setValue}
            defaultImage={userProfile?.profilePicturePath}
          />
          {userType === 'Creator' && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className="block w-full rounded-xl border border-gray-300 p-2 text-gray-700"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className="block w-full rounded-xl border border-gray-300 p-2"
                />
              </div>
            </>
          )}
          {['Brand', 'Agency'].includes(userType) && (
            <div>
              <label
                htmlFor="companyName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {userType === 'Brand' ? 'Brand Name' : 'Agency Name'}
              </label>
              <input
                id="companyName"
                type="text"
                {...register('companyName')}
                className="block w-full rounded-xl border border-gray-300 p-2 text-gray-700"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="Phone"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Phone
            </label>
            <PhoneInput
              defaultCountry="us"
              value={phoneNumber}
              inputClassName="w-full"
              countrySelectorStyleProps={{
                flagClassName: 'p-1',
              }}
              onChange={(num) => {
                num && setValue('phoneNumber', num);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="Phone"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              {...register('country')}
              className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
            >
              <option value="">Select</option>
              {Object.entries(countries).map(([id, country]) => (
                <option
                  key={id}
                  value={country.isoCode}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className="form-input mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
              />
            </div>

            <div className="w-1/3">
              <label
                htmlFor="state"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                State
              </label>
              <select
                id="state"
                {...register('state')}
                className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option
                    key={state.isoCode}
                    value={state.isoCode}
                  >
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CSButton
            type="submit"
            size="lg"
            disabled={!isValid}
            isProcessing={isCreateProfilePending || isUpdateProfilePending}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
          >
            Next: Social Media
          </CSButton>
        </form>
      </div>
    </>
  );
};
