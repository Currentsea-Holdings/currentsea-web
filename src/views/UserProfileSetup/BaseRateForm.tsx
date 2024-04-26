import { type ConnectedAccessTokenTypes, accessTokensApi } from '@/api/platforms/accessTokensApi';
import { socialLogoArray } from '@/assets/images/platform-logos/platform-logos-data';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { Modal, Tooltip } from 'flowbite-react';
import { InfoCircle } from 'flowbite-react-icons/outline';
import { Input } from 'postcss';
import { useEffect, useState } from 'react';
import {
  type FieldValues,
  type UseFormRegister,
  useForm,
  type UseFormSetError,
  type UseFormClearErrors,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '@/services/userProfileService';
import { CSButton } from '@/components/common';
import '@/styles/rate-form.styles.css';

type PlatformFieldNames =
  | 'Video'
  | 'Post'
  | 'Story'
  | 'Live'
  | 'Stream'
  | 'Shorts'
  | 'Reel'
  | 'Pin'
  | 'Tweet';

const inputTypes: { [key: string]: PlatformFieldNames[] } = {
  youtube: ['Video', 'Shorts', 'Live'],
  tiktok: ['Post', 'Story', 'Live'],
  twitch: ['Stream'],
  instagram: ['Post', 'Story', 'Reel', 'Live'],
  facebook: ['Post', 'Story', 'Reel', 'Live'],
  linkedin: ['Post'],
  snapchat: ['Post', 'Story', 'Live'],
  pinterest: ['Pin'],
  x: ['Tweet'],
};

export type SocialMediaRatesFormFields = {
  [key in PlatformFieldNames]: string;
};

const BaseRateForm = () => {
  const navigate = useNavigate();
  const userProfile = useAuthStore((state) => state.userProfile);
  const { user, nextStep, setIsProfileCreationStepsOpen, closeModal } = useUserProfile();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SocialMediaRatesFormFields>();

  const [connections, setConnections] = useState<ConnectedAccessTokenTypes>({
    tiktok: false,
    youtube: false,
    twitch: false,
    facebook: false,
    instagram: false,
    linkedin: false,
    pinterest: false,
    snapchat: false,
    x: false,
    paypal: false,
  });

  useEffect(() => {
    // this will check for current accessTokens the particular userId has already
    if (user?.id) {
      accessTokensApi
        .getConnectedAccessTokens(user.id)
        .then((connectionStatuses: ConnectedAccessTokenTypes) => {
          setConnections(connectionStatuses);
        })
        .catch((error: unknown) => {
          console.error('Error fetching social media connections:', error);
        });
    } else {
      console.log('User is not logged in');
      navigate('/');
    }
  }, [user, navigate]);

  const mutationFunction = async (formData: SocialMediaRatesFormFields) => {
    if (!userProfile || !user) throw new Error('User profile is not available.');
    const ratesArray = Object.entries(formData).map(([key, value]) => {
      const [platform, type] = key.split('_');
      return {
        platform,
        type,
        rate: value,
      };
    });
    const payload = {
      id: userProfile.id,
      userId: userProfile.id,
      city: userProfile.city,
      state: userProfile.state,
      phoneNumber: userProfile.phoneNumber,
      rates: ratesArray,
    };
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

  const onSubmit = (formData: SocialMediaRatesFormFields) => {
    mutate(formData);
  };

  const renderInputForPlatform = (
    platformId: keyof ConnectedAccessTokenTypes,
    type: keyof SocialMediaRatesFormFields,
    register: UseFormRegister<SocialMediaRatesFormFields>,
    watch: (fieldName: string) => string,
  ) => {
    const label = type.split('_').join(' ');
    const fieldName = `${platformId}_${type}` as keyof SocialMediaRatesFormFields;
    const inputValue = watch(fieldName);

    return (
      <div className="input-wrapper">
        <label className="input-label">{label}</label>
        <div className="input-prefix-wrapper">
          <span
            className="input-prefix"
            style={{ visibility: inputValue ? 'hidden' : 'visible' }}
          >
            $
          </span>
          <input
            type="number"
            className="input-field input-with-prefix"
            style={{ width: '150px', borderRadius: '12px', paddingLeft: '20px' }}
            {...register(fieldName)}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value < 0) {
                setError(fieldName, { type: 'manual', message: 'Value cannot be negative' });
              } else {
                clearErrors(fieldName);
              }
            }}
          />
        </div>
        {errors[fieldName] && <p style={{ color: '#ed3b3b' }}>{errors[fieldName]?.message}</p>}
      </div>
    );
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
      className="border-none"
    >
      <Modal.Header className="border-none">
        <div className="flex items-center justify-between">
          Set your base rates...
          <Tooltip
            content="These prices are a starting point. You will have the opportunity to negotiate prices with brands"
            style="light"
          >
            <InfoCircle
              size={21}
              fill="#2b4498"
              className="text-white"
            />
          </Tooltip>
        </div>
      </Modal.Header>
      <Modal.Body className="modal-body-custom border-none text-custom-blue">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {socialLogoArray.map((platform) => {
            if (connections[platform.id]) {
              const inputsToRender = inputTypes[platform.id];
              return (
                <div
                  key={platform.id}
                  className="platform-section"
                >
                  <div className="platform-header">
                    <platform.Icon className="platform-icon" />
                    <span className="platform-name">{platform.name}</span>
                  </div>
                  <div className="platform-inputs">
                    {inputsToRender.map((inputType, index) =>
                      renderInputForPlatform(platform.id, inputType, register, watch),
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}

          <CSButton
            type="submit"
            disabled={!isValid || isPending}
            isProcessing={isPending}
            className="w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Rates
          </CSButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default BaseRateForm;
