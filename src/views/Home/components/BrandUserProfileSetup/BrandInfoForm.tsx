import { Textarea } from 'flowbite-react';
import { Controller, useForm } from 'react-hook-form';

import { CSButton } from '@/components';
import { IndustryDropdown } from '@/components/inputs/IndustryDropdown';
import { useManageUserProfile } from '@/hooks/useManageUserProfile';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthStore } from '@/stores/authStore';

import { InfoTooltip } from '../InfoTooltip';

import type { UserProfile } from '@/types';
interface FormFields {
  shortBio: string;
  industryIds: string[];
  website: string;
}

export const BrandInfoForm = () => {
  const userProfile = useAuthStore((state) => state.userProfile) as UserProfile;
  const { saveUserProfile, isProcessing } = useManageUserProfile();

  const { nextStep, closeModal } = useUserProfile();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      shortBio: '',
      industryIds: userProfile.industries?.map((industry) => industry.id) ?? [],
      website: '',
    },
  });

  const onSubmit = (formData: FormFields) => {
    const data = {
      ...formData,
      id: userProfile.id,
    };

    saveUserProfile(data, null, nextStep);
  };

  return (
    // <Modal
    //   show={true}
    //   onClose={closeModal}
    // >
    //   <Modal.Header>Tell us a little more about your brand...</Modal.Header>
    //   <Modal.Body className="flex flex-col md:min-h-[500px]">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-grow flex-col"
    >
      <div className="space-y-4">
        <label
          htmlFor="shortBio"
          className="flex text-sm font-medium text-gray-700"
        >
          Biography
        </label>
        <Textarea
          {...register('shortBio', { required: 'Biography is required' })}
          placeholder="Let your personality shine..."
          rows={4}
          className="bg-white"
        />
        {errors.shortBio && <p className="text-red-500">{errors.shortBio.message}</p>}

        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <label
              htmlFor="industryIds"
              className="flex text-sm font-medium text-gray-700"
            >
              Select your industry
              <InfoTooltip
                content="SSelect the industry that best represents your brand."
                size={16}
                className="ml-2"
              />
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
          <div className="space-y-4">
            <label
              htmlFor="website"
              className="flex text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              id="website"
              type="text"
              placeholder="Paste link here"
              {...register('website')}
              className="mb-2 block w-full rounded-xl border border-gray-300 p-2 text-gray-700"
              style={{ fontSize: '14px', paddingLeft: '10px' }}
            />
          </div>
        </div>
      </div>
      <CSButton
        type="submit"
        disabled={!isValid || isProcessing}
        isProcessing={isProcessing}
        className="mt-auto w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Next: Highlights
      </CSButton>
    </form>
    //   </Modal.Body>
    // </Modal>
  );
};

export default BrandInfoForm;
