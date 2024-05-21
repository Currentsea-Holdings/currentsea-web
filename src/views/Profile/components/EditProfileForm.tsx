import { Textarea } from 'flowbite-react';
import { Controller, useForm } from 'react-hook-form';

import { IndustryDropdown } from '@/components/inputs/IndustryDropdown';
import { ProfileImageUploader } from '@/components/inputs/ProfileImageUploader';
import { BASE_API_URL } from '@/utils/constants';

import type { UpdateUserProfile, UserProfile } from '@/types';
import { forwardRef } from 'react';

interface EditProfileFormProps {
  userProfile: UserProfile;
  handleSave: (data: UpdateUserProfile, profilePicture: File | null) => void;
}

interface FormFields {
  shortBio: string;
  industryIds: string[];
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  profilePicture: File | null;
}

export const EditProfileForm = forwardRef<HTMLFormElement, EditProfileFormProps>(
  ({ userProfile, handleSave }, ref) => {
    EditProfileForm.displayName = 'EditProfileForm';

    const formMethods = useForm<FormFields>({
      defaultValues: {
        profilePicture: null,
        shortBio: userProfile.shortBio ?? '',
        industryIds: userProfile.industries?.map((industry) => industry.id) ?? [],
      },
    });

    const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors, isValid },
    } = formMethods;

    const onSubmit = (formData: FormFields) => {
      const { id } = userProfile;
      const { profilePicture, ...profileData } = formData;
      const data = { id, ...profileData };
      
      handleSave(data, profilePicture ?? null);
    };

    return (
      <div className="mx-40 flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
        <form
          ref={ref}
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
              name="industryIds"
              control={control}
              render={({ field: { onChange, value } }) => (
                <IndustryDropdown
                  selectedIndustryIds={value}
                  onSelectIndustryId={(industryId) => {
                    onChange([...value, industryId]);
                  }}
                  onRemoveIndustryId={(industryId) => {
                    onChange(value.filter((id) => id !== industryId));
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
    );
  },
);
