import { useForm } from 'react-hook-form';
import { STATES } from '@/utils/constants';
import { CSButton } from '@/components/common';
import { useMutation } from '@tanstack/react-query';
import { createUserProfile, updateUserProfile } from '@/services/userProfileService';
import type {
  UserProfileResponse,
  CreateUserProfilePayload,
  UpdateUserProfilePayload,
} from '@/services/userProfileService';
import { useAuthStore, type User } from '@/stores/authStore';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import type { IState } from 'country-state-city';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

interface AccountSetupFormProps {
  user: User;
  onNext: () => void;
}

interface AccountSetupFormFields {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  profilePhoto: FileList;
}

export const AccountSetupForm = ({ user, onNext }: AccountSetupFormProps) => {
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const userProfile = useAuthStore((state) => state.userProfile);
  const { id } = user;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AccountSetupFormFields>({
    defaultValues: {
      firstName: userProfile?.firstName ?? '',
      lastName: userProfile?.lastName ?? '',
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
    UserProfileResponse,
    Error,
    CreateUserProfilePayload
  >({ mutationFn: createUserProfile });

  const { mutate: submitUpdateUserProfile, isPending: isUpdateProfilePending } = useMutation<
    UserProfileResponse,
    Error,
    UpdateUserProfilePayload
  >({ mutationFn: updateUserProfile });

  const onSubmit = (data: AccountSetupFormFields) => {
    const formData = data;

    if (userProfile) {
      submitUpdateUserProfile(
        { id: userProfile.id, userId: user.id, ...formData },
        {
          onSuccess: (data) => {
            console.log('User Profile updated successfully.');
            setUserProfile(data);
            onNext();
          },
          onError: (error) => {
            console.error('error:', error);
          },
        },
      );
    } else {
      submitCreateUserProfile(
        { userId: id, ...formData },
        {
          onSuccess: (data) => {
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
          <div className="mb-0 text-left">
            <label
              htmlFor="profilePhoto"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Profile photo
            </label>
            <div className="flex items-center">
              <label
                htmlFor="profilePhoto"
                className="cursor-pointer rounded-l-xl border border-blue-600 bg-blue-600 px-4 py-2 text-white"
              >
                Choose file
              </label>
              <div className="relative flex-1 rounded-r-xl border border-gray-300 px-4 py-2 text-gray-700">
                <span id="file-chosen">No file chosen</span>
                <input
                  type="file"
                  id="profilePhoto"
                  {...register('profilePhoto')}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={(event) => {
                    //Need to add code here
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="First name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName')}
              className="block w-full  rounded-xl border border-gray-300 p-2 text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="Last name"
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
