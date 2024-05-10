import { Modal, Textarea, Tooltip } from 'flowbite-react';
import { InfoCircle } from 'flowbite-react-icons/outline';
import { Controller, useForm } from 'react-hook-form';

import { CSButton } from '@/components';
import { IndustryDropdown } from '@/components/inputs/IndustryDropdown';
import { useUserProfile } from '@/hooks/useUserProfile';
import { updateUserProfile } from '@/services/userProfileService';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

import type { UserProfile } from '@/stores/authStore';
interface Industry {
  id: number;
  name: string;
}

interface FormFields {
  shortBio: string;
  industries: Industry[];
}

const CreatorInfoForm = () => {
  const userProfile = useAuthStore((state) => state.userProfile) as UserProfile;
  const { nextStep, closeModal } = useUserProfile();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      shortBio: '',
      industries: [],
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      console.log('Profile updated successfully.');
      nextStep();
    },
    onError: (error: Error) => {
      console.error('Error submitting profile:', error.message);
    },
  });

  const onSubmit = (formData: FormFields) => {
    const data = { ...formData, id: userProfile.id };

    updateProfile(data);
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
    >
      <Modal.Header>Tell us a little more about yourself...</Modal.Header>
      <Modal.Body className="flex flex-col md:min-h-[500px]">
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
                  htmlFor="industries"
                  className="flex text-sm font-medium text-gray-700"
                >
                  Select your industry
                  <Tooltip
                    content="Select the industry that best represents the content you create."
                    style="light"
                  >
                    <InfoCircle
                      size={20}
                      fill="#cfcfcf"
                      className="text-white"
                    />
                  </Tooltip>
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
            </div>
          </div>
          <CSButton
            type="submit"
            disabled={!isValid || isPending}
            isProcessing={isPending}
            className="mt-auto w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Next: Rates
          </CSButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatorInfoForm;
