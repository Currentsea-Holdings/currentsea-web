import { useForm } from 'react-hook-form';
import { OnboardingBreadcrumbs } from './components/OnboardingBreadcrumbs';
import { STATES } from '@/utils/constants';
import PhoneInput from 'react-phone-number-input/input';
import { CSButton } from '@/components/common';
import { useMutation } from '@tanstack/react-query';
import { createUserProfile } from '@/services/userProfileService';
import type { UserProfileResponse, CreateUserProfilePayload } from '@/services/userProfileService';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
interface AccountSetupFormFields {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  profilePhoto: FileList;
}

export const OnboardingView = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    navigate('/');
  }
  const id = user?.id;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AccountSetupFormFields>();

  const { mutate: submitCreateUserProfile, isPending } = useMutation<
    UserProfileResponse,
    Error,
    CreateUserProfilePayload
  >({ mutationFn: createUserProfile });

  const onSubmit = (data: AccountSetupFormFields) => {
    const formData = data;
    formData.phoneNumber = formData.phoneNumber.replace(/[^0-9]/g, '');

    submitCreateUserProfile(
      { userId: id as string, ...formData },
      {
        onSuccess: (data) => {
          console.log('User Profile created successfully.');
          navigate('/home');
        },
        onError: (error) => {
          // console.error('error:', error);
        },
      },
    );
  };

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={1} />
      <div className="flex w-3/4 flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <h3 className="mb-10 text-center text-2xl font-bold text-black">
            Let&apos;s start with the basics...
          </h3>
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
                defaultCountry="US"
                country="US"
                isValidPhoneNumber={true}
                {...register('phoneNumber')}
                onChange={() => {}}
                className="block w-full rounded-xl border border-gray-300 p-2"
              />
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
                  {Object.entries(STATES).map(([value, name]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <CSButton
              type="submit"
              disabled={!isValid}
              isProcessing={isPending}
              className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
            >
              Next: Social Media
            </CSButton>
          </form>
        </div>
      </div>
    </div>
  );
};
