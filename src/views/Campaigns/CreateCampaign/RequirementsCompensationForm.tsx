import type { CampaignFormData } from '@/stores/createCampaignStore';
import { Label, TextInput } from 'flowbite-react';
import { Dollar } from 'flowbite-react-icons/outline';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CSButton } from '@/components';
import { ButtonAdd } from '@/components/ButtonAdd';
import { SocialMediaIcon } from '@/components/SocialMediaIcon';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';
import { socialMediaPlatforms } from '@/utils/socialMediaIconsCircle';
import { DevTool } from '@hookform/devtools';

interface RequirementsCompensationFormProps {
  title: string;
}

export const RequirementsCompensationForm = ({ title }: RequirementsCompensationFormProps) => {
  const { formData, setFormData, setCurrentStep, coverPhoto, setCoverPhoto } =
    useCreateCampaignStore((state) => ({
      formData: state.formData,
      setFormData: state.setFormData,
      setCurrentStep: state.setCurrentStep,
      coverPhoto: state.coverPhoto,
      setCoverPhoto: state.setCoverPhoto,
    }));

  type FormFields = CampaignFormData['reqAndComp'];

  const { register, control, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      requirements: formData.reqAndComp?.requirements || [''],
      minComp: formData.reqAndComp?.minComp || null,
      maxComp: formData.reqAndComp?.maxComp || null,
      platforms: formData.reqAndComp?.platforms || [],
    },
  });

  const addRequirement = () => {
    const newRequirements = [...(formData.reqAndComp?.requirements || []), ''];
    setFormData({ reqAndComp: { ...formData.reqAndComp, requirements: newRequirements } });
  };

  const handlePlatformSelection = (platformName: string) => {
    const currentPlatforms = watch('platforms') || [];
    const isSelected = currentPlatforms.includes(platformName);
    const updatedPlatforms = isSelected
      ? currentPlatforms.filter((p) => p !== platformName)
      : [...currentPlatforms, platformName];

    setValue('platforms', updatedPlatforms);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'platforms') {
        const platformsArray = (value.platforms || []).filter(
          (item): item is string => item !== undefined,
        );
        setFormData({
          reqAndComp: {
            ...formData.reqAndComp,
            platforms: platformsArray,
          },
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, formData, setFormData]);

  const onSubmit = (data: FormFields) => {
    const filteredRequirements = (data.requirements || []).filter(
      (requirement) => requirement && requirement.trim() !== '',
    );
    setFormData({
      reqAndComp: {
        ...formData.reqAndComp,
        requirements: filteredRequirements,
        minComp: data.minComp,
        maxComp: data.maxComp,
        platforms: data.platforms,
      },
    });
    setCurrentStep(3);
  };

  return (
    <>
      <h1 className="my-10 text-center font-semibold text-dark">{title}</h1>
      <form
        className="flex flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 w-full">
          <Label
            htmlFor="campaignName"
            value="Content Requirements"
            className="mb-2 block"
          />
          <ol className="space-y-4">
            {formData.reqAndComp?.requirements?.map((requirement, index) => (
              <li
                key={index}
                className="flex items-center"
              >
                <span className="font-dark mr-1 flex w-6 items-center justify-start text-xl font-medium">
                  {index + 1}.
                </span>
                <TextInput
                  color=""
                  className="w-full"
                  required={index === 0 && requirement === ''}
                  {...register(`requirements.${index}`, {
                    required: index === 0 && requirement === '',
                  })}
                />
              </li>
            ))}
          </ol>
          <div className="mt-4 flex w-full justify-center">
            <ButtonAdd
              size="sm"
              onClick={addRequirement}
            />
          </div>
        </div>
        <div className="w-full">
          <Label
            htmlFor="compensation"
            value="Compensation"
            className="mb-2 block"
          />
        </div>
        <div className="flex w-full">
          <div className="mb-4 w-full md:mb-10 md:pr-2">
            <TextInput
              id="minComp"
              icon={Dollar}
              placeholder="Min"
              color=""
              required
              {...register('minComp', { required: true })}
            />
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-10 md:w-8">
            <div className="w-full border-t border-gray-400"></div>
          </div>
          <div className="w-full md:mb-10 md:pl-2">
            <TextInput
              id="maxComp"
              icon={Dollar}
              placeholder="Max"
              color=""
              required
              {...register('maxComp', { required: true })}
            />
          </div>
        </div>

        <div className="mb-10 w-full">
          <Label
            htmlFor="description"
            value="Required Social Media Platforms"
            className="mb-2 block"
          />
          {socialMediaPlatforms.map((platform) => (
            <SocialMediaIcon
              key={platform.name}
              platform={platform}
              onClick={() => {
                handlePlatformSelection(platform.name);
              }}
              isSelected={watch('platforms')?.includes(platform.name)}
            />
          ))}
        </div>
        <CSButton
          type="button"
          size="lg"
          className="flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5"
          onClick={handleSubmit(onSubmit)}
        >
          Next: tasks
        </CSButton>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};
