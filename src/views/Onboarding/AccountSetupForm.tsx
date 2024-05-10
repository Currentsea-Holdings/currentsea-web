import 'react-international-phone/style.css';

import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';

import { CSButton } from '@/components';
import { ProfileImageUploader } from '@/components/ProfileImageUploader';
import { useManageUserProfile } from '@/hooks/useManageUserProfile';
import { useAuthStore } from '@/stores/authStore';
import { BASE_API_URL } from '@/utils/constants';

import type { User } from '@/stores/authStore';
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
  const { id, userType } = user as { id: string; userType: 'Creator' | 'Brand' | 'Agency' };
  
  const { saveUserProfile, isProcessing } = useManageUserProfile();
  const userProfile = useAuthStore((state) => state.userProfile);
  
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
      firstName: '',
      lastName: '',
      companyName: '',
      phoneNumber: '',
      city: '',
      state: '',
      country: 'US',
    },
  });

  useEffect(() => {
    if (userProfile) {
      setValue('firstName', userProfile.firstName ?? '');
      setValue('lastName', userProfile.lastName ?? '');
      setValue('companyName', userProfile.companyName ?? '');
      setValue('phoneNumber', userProfile.phoneNumber ?? '');
      setValue('city', userProfile.city);
      setValue('state', userProfile.state);
      setValue('country', userProfile.country);
    }
  }, [userProfile, setValue]);

  const phoneNumber = watch('phoneNumber');
  const selectedCountry = watch('country');

  const countries = Country.getAllCountries();

  // Load states based on the selected country
  const [states, setStates] = useState<IState[]>([]);
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);
      setValue('state', fetchedStates.find((state) => state.isoCode === userProfile?.state) ? (userProfile?.state || '') : '');
    }
  }, [selectedCountry, userProfile?.state, setValue]);

  const onSubmit = (data: AccountSetupFormFields) => {
    const { profilePicture, ...profileData } = data;

    const profileInfo = {
      ...profileData,
      ...(userProfile ? { id: userProfile.id } : { userId: id }),
    };

    saveUserProfile(profileInfo, profilePicture, onNext);
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
          <div className="mb-0 text-left">
            <label
              htmlFor="profilePicture"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Profile photo
            </label>
            <ProfileImageUploader
              control={control}
              setValue={setValue}
              fieldName="profilePicture"
              defaultImage={
                userProfile?.profilePicturePath
                  ? `${BASE_API_URL}/${userProfile.profilePicturePath}`
                  : ''
              }
            />
          </div>
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
            isProcessing={isProcessing}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
          >
            Next: Social Media
          </CSButton>
        </form>
      </div>
    </>
  );
};
