import { FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CampaignType } from '@/api/types';
import { CSButton } from '@/components';
import { CSDatepicker } from '@/components/CSDatepicker';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';
import { DevTool } from '@hookform/devtools';

import type { CampaignFormData } from '@/stores/createCampaignStore';
interface CampaignDetailsFormProps {
  title: string;
}

export const CampaignDetailsForm = ({ title }: CampaignDetailsFormProps) => {
  const { formData, setFormData, setCurrentStep, coverPhoto, setCoverPhoto } =
    useCreateCampaignStore((state) => ({
      formData: state.formData,
      setFormData: state.setFormData,
      setCurrentStep: state.setCurrentStep,
      coverPhoto: state.coverPhoto,
      setCoverPhoto: state.setCoverPhoto,
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
      coverPhoto: formData.campaignDetails?.coverPhoto || null,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');

  useEffect(() => {
    if (coverPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(coverPhoto);
      setSelectedFileName(coverPhoto.name);
    } else {
      setPreviewImage(null);
      setSelectedFileName('No file chosen');
    }
  }, [coverPhoto]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
    } else {
      setCoverPhoto(null);
    }
  };

  const onSubmit = (data: FormFields) => {
    setFormData({ campaignDetails: { ...data, coverPhoto } });
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
            htmlFor="campaignType"
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
                id="startDate"
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
                id="endDate"
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
                id="applicationDueDate"
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
          <div className="flex items-center">
            {previewImage && (
              <div className="mr-2 shrink-0">
                <img
                  src={previewImage}
                  alt="Cover Preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            )}
            <label
              htmlFor="coverPhoto"
              className="cursor-pointer rounded-l-xl border border-primary bg-primary px-4 py-2 text-white"
            >
              Choose file
            </label>
            <div className="relative flex-1 rounded-r-xl border border-gray-300 px-4 py-2 text-gray-700">
              <span id="file-chosen">{selectedFileName}</span>
              <Controller
                control={control}
                name="coverPhoto"
                render={({ field: { ref, onBlur } }) => (
                  <input
                    type="file"
                    id="coverPhoto"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    ref={ref}
                    onBlur={onBlur}
                    onChange={handleFileChange}
                  />
                )}
              />
            </div>
          </div>
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
