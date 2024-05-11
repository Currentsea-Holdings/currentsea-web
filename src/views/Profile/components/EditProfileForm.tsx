import 'react-international-phone/style.css';

import { Controller, set, useForm } from 'react-hook-form';

import { IndustryDropdown } from '@/components/inputs/IndustryDropdown';
import { ProfileImageUploader } from '@/components/inputs/ProfileImageUploader';
import { useManageUserProfile } from '@/hooks/useManageUserProfile';
import { useAuthStore } from '@/stores/authStore';
import { BASE_API_URL } from '@/utils/constants';

import type { User } from '@/stores/authStore';
import type { UserProfile } from '@/stores/authStore';
import { Textarea } from 'flowbite-react';

interface EditProfileFormProps {
  toggleEdit: () => void;
}

interface Industry {
  id: number;
  name: string;
}

interface FormFields {
  shortBio: string;
  industries: Industry[];
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  profilePicture: File | null;
}

export const EditProfileForm = ({ toggleEdit }: EditProfileFormProps) => {
  const userProfile = useAuthStore((state) => state.userProfile) as UserProfile;
  const { saveUserProfile, isProcessing } = useManageUserProfile();

  const formMethods = useForm<FormFields>({
    defaultValues: {
      profilePicture: null,
      shortBio: userProfile.shortBio ?? '',
      industries: userProfile.industries ?? [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmit = (data: FormFields) => {
    const { profilePicture, ...profileData } = data;
    const profileInfo = { ...profileData, id: userProfile.id };
    saveUserProfile(profileInfo, profilePicture);
    toggleEdit();
  };

  return (
    <>
      <div className="mx-40 flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-10 bg-gray-10"
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
                userProfile.profilePicturePath
                  ? `${BASE_API_URL}/${userProfile.profilePicturePath}`
                  : ''
              }
            />
          </div>

          <div>
            <label
              htmlFor="shortBio"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Biography
            </label>
            <Textarea
              id="shortBio"
              {...register('shortBio')}
              className="block w-full rounded-xl border border-gray-300 bg-white p-2 text-gray-700"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="industries"
              className="flex text-sm font-medium text-gray-700"
            >
              Select your industry
            </label>
            <Controller
              name="industries"
              control={control}
              render={({ field: { onChange, value } }) => (
                <IndustryDropdown
                  selectedIndustries={value}
                  onSelectIndustry={(industry) => {
                    onChange([...value, industry]);
                  }}
                  onRemoveIndustry={(industry) => {
                    onChange(value.filter((ind) => ind.id !== industry.id));
                  }}
                />
              )}
            />
          </div>
          <div className="mt-10 h-52 w-full">
            {/* <h3 className="mb-5 text-left font-semibold text-dark">Highlights</h3> */}
            {/* <Highlights isEditing={true} /> */}
          </div>
        </form>
      </div>
    </>
  );
};
