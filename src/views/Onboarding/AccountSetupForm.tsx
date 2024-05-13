import 'react-international-phone/style.css';

import { FormProvider, useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';

import { CSButton } from '@/components';
import { LocationSelector } from '@/components/inputs/LocationSelector';
import { ProfileImageUploader } from '@/components/inputs/ProfileImageUploader';
import { useManageUserProfile } from '@/hooks/useManageUserProfile';
import { useAuthStore } from '@/stores/authStore';
import { BASE_API_URL } from '@/utils/constants';

import type { User } from '@/types';
interface AccountSetupFormProps {
  user: User;
  onNext: () => void;
}

interface FormFields {
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

  const userProfile = useAuthStore((state) => state.userProfile);
  const { saveUserProfile, isProcessing } = useManageUserProfile();

  const formMethods = useForm<FormFields>({
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmit = (formData: FormFields) => {
    const { profilePicture, ...profileData } = formData;

    const data = {
      ...profileData,
      ...(userProfile ? { id: userProfile.id } : { userId: id }),
    };

    saveUserProfile(data, profilePicture, onNext);
  };

  return (
    <FormProvider {...formMethods}>
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
              value={watch('phoneNumber')}
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
          <LocationSelector
            initialCountry={userProfile?.country}
            initialState={userProfile?.state}
            initialCity={userProfile?.city}
          />
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
    </FormProvider>
  );
};
