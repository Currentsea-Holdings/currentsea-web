import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Dropdown, Modal, Textarea, Button, Tooltip } from 'flowbite-react';
import { CSButton } from '@/components';
import { updateUserProfile } from '@/services/userProfileService';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthStore } from '@/stores/authStore';
import { InfoCircle } from 'flowbite-react-icons/outline';

interface FormFields {
  shortBio: string;
  industries: string[];
  website: string;
}

const industryOptions = ['Food', 'Gaming', 'Hair', 'Health', 'Home'];

const BrandInfoForm = () => {
  const userProfile = useAuthStore((state) => state.userProfile);
  const { user, nextStep, setIsProfileCreationStepsOpen, closeModal } = useUserProfile();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      shortBio: '',
      industries: [],
      website: '',
    },
  });

  const selectedIndustries = watch('industries');

  const handleSelectIndustry = (industry: string) => {
    const newIndustries = selectedIndustries.includes(industry)
      ? selectedIndustries
      : [...selectedIndustries, industry].slice(0, 3);
    setValue('industries', newIndustries);
  };

  const handleRemoveIndustry = (industry: string) => {
    const newIndustries = selectedIndustries.filter((ind: string) => ind !== industry);
    setValue('industries', newIndustries);
  };

  const mutationFunction = async (formData: FormFields) => {
    console.log('formData:', formData);
    if (!userProfile || !user) throw new Error('User profile is not available.');
    const payload = {
      id: userProfile.id,
      userId: userProfile.id,
      city: userProfile.city,
      state: userProfile.state,
      phoneNumber: userProfile.phoneNumber,
      shortBio: formData.shortBio,
      industries: formData.industries,
      website: formData.website,
      rates: [],
    };
    console.log('payload:', payload);
    return await updateUserProfile(payload);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      console.log('Profile updated successfully.');
      nextStep();
    },
    onError: (error: Error) => {
      console.error('Error submitting profile:', error);
    },
  });

  const onSubmit = (formData: FormFields) => {
    mutate(formData);
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
    >
      <Modal.Header>Tell us a little more about your brand...</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Textarea
            {...register('shortBio', { required: 'Biography is required' })}
            placeholder="Let your personality shine..."
            rows={4}
            className="bg-white"
          />
          {errors.shortBio && <p className="text-red-500">{errors.shortBio.message}</p>}

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="bio"
              className="block flex text-sm font-medium text-gray-700"
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
            <div className="space-y-4">
              <Dropdown
                label={
                  selectedIndustries.length > 0
                    ? `${selectedIndustries.length} out of 3 selected`
                    : 'Select up to 3'
                }
                className="w-full text-primary"
                inline={false}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  background: 'white',
                  color: '#7c7c7c',
                  border: '1px solid #DCDCDC',
                }}
              >
                {industryOptions.map((industry) => (
                  <Dropdown.Item
                    key={industry}
                    onClick={() => {
                      handleSelectIndustry(industry);
                    }}
                  >
                    {industry}
                  </Dropdown.Item>
                ))}
              </Dropdown>
              <div className="mt-2 flex flex-wrap gap-2">
                {getValues('industries').map((industry) => (
                  <div
                    key={industry}
                    style={{ color: '#525d7a' }}
                    className="flex items-center space-x-2 rounded bg-gray-200 px-2 py-1"
                  >
                    <span>{industry}</span>
                    <button
                      style={{ width: '100%', color: '#525d7a' }}
                      onClick={() => {
                        handleRemoveIndustry(industry);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              <label
                htmlFor="bio"
                className="block flex text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                id="website"
                type="text"
                placeholder="Paste link here"
                {...register('website')}
                className="block w-full rounded-xl border border-gray-300 p-2 text-gray-700 mb-2"
                style={{fontSize: '14px', paddingLeft: '10px'}}
              />
              </div>
            </div>

            <CSButton
              type="submit"
              disabled={!isValid || isPending}
              isProcessing={isPending}
              className="w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Next: Highlights
            </CSButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default BrandInfoForm;
