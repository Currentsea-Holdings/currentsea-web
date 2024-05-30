import type { CampaignFormData } from '@/types';
import { FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { Controller, useForm } from 'react-hook-form';

import { CampaignType } from '@/api/types';
import { CSButton } from '@/components';
import { CSDatepicker } from '@/components/CSDatepicker';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';
import { DevTool } from '@hookform/devtools';

interface CampaignDetailsFormProps {
  title: string;
}

export const CampaignDetailsForm = ({ title }: CampaignDetailsFormProps) => {
  const { formData, setFormData, setCurrentStep } = useCreateCampaignStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
    setCurrentStep: state.setCurrentStep,
  }));

  type FormFields = CampaignFormData['campaignDetails'];

  const { register, control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: formData.campaignDetails?.name || '',
      type: formData.campaignDetails?.type || undefined,
      startDate: formData.campaignDetails?.startDate || null,
      endDate: formData.campaignDetails?.endDate || null,
      applicationDueDate: formData.campaignDetails?.applicationDueDate || null,
      description: formData.campaignDetails?.description || '',
    },
  });

  const onSubmit = (data: FormFields) => {
    setFormData({ campaignDetails: data });
    setCurrentStep(2);
  };

  return (
    <>
      <h1 className="my-10 text-center font-semibold text-dark">{title}</h1>
      <form
        className="flex flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 w-full md:mb-10 md:w-1/2 md:pr-2">
          <Label
            htmlFor="campaignName"
            value="Campaign Name"
            className="mb-2 block"
          />
          <TextInput
            id="campaignName"
            color=""
            required
            {...register('name', { required: true })}
          />
        </div>
        <div className="w-full md:mb-10 md:w-1/2 md:pl-2">
          <Label
            htmlFor="campaignName"
            value="Campaign Type"
            className="mb-2 block"
          />
          <Select
            id="campaignType"
            color=""
            defaultValue=""
            required
            {...register('type', { required: true })}
          >
            <option
              value=""
              disabled
            >
              Select
            </option>
            {Object.values(CampaignType).map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4 w-full md:mb-10 md:w-1/2 md:pr-2">
          <Label
            htmlFor="startDate"
            value="Start Date"
            className="mb-2 block"
          />
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CSDatepicker
                placeholder="Select date"
                value={value ? new Date(value).toISOString().split('T')[0] : ''}
                onChange={(date) => {
                  onChange(date);
                }}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="mb-4 w-full md:mb-10 md:w-1/2 md:pl-2">
          <Label
            htmlFor="endDate"
            value="End Date"
            className="mb-2 block"
          />
          <Controller
            name="endDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CSDatepicker
                placeholder="Select date"
                value={value ? new Date(value).toISOString().split('T')[0] : ''}
                onChange={(date) => {
                  onChange(date);
                }}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="mb-10 w-full">
          <Label
            htmlFor="applicationDueDate"
            value="Creator Application Due Date"
            className="mb-2 block"
          />
          <Controller
            name="applicationDueDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CSDatepicker
                placeholder="Select date"
                value={value ? new Date(value).toISOString().split('T')[0] : ''}
                onChange={(date) => {
                  onChange(date);
                }}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </div>
        <div className="mb-10 w-full">
          <Label
            htmlFor="coverPhoto"
            value="Campaign Cover Photo"
            className="mb-2 block"
          />
          <FileInput
            id="cover_photo"
            color=""
          />
        </div>
        <div className="mb-10 w-full">
          <Label
            htmlFor="description"
            value="Campaign Description"
            className="mb-2 block"
          />
          <Textarea
            id="description"
            color=""
            placeholder="Campaign Description"
            required
            rows={4}
            {...register('description', { required: true })}
          />
        </div>
        <CSButton
          type="button"
          size="lg"
          className="flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5"
          onClick={handleSubmit(onSubmit)}
        >
          Next: Content
        </CSButton>
      </form>
      <DevTool control={control} />
    </>
  );
};
