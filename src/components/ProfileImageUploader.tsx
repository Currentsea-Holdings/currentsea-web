import type React from 'react';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { getBase64 } from '@/utils';

import type { Control, UseFormSetValue } from 'react-hook-form';
type TFormValues = {
  profilePicture: File | null;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
};

interface ProfileImageUploaderProps {
  control: Control<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  defaultImage?: string;
}

export const ProfileImageUploader = ({
  control,
  setValue,
  defaultImage,
}: ProfileImageUploaderProps) => {
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImage || '');

  useEffect(() => {
    setImagePreviewUrl(defaultImage || '');

    if (defaultImage) {
      const urlParts = defaultImage.split('/');
      const fileName = urlParts[urlParts.length - 1];
      setSelectedFileName(decodeURIComponent(fileName));
    } else {
      setSelectedFileName('No file chosen');
    }
  }, [defaultImage]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setValue('profilePicture', file, { shouldValidate: true });

      setSelectedFileName(file.name);
      const base64 = await getBase64(file);
      setImagePreviewUrl(base64);
    } else {
      setValue('profilePicture', null, { shouldValidate: true });
      setSelectedFileName('No file chosen');
      setImagePreviewUrl('');
    }
  };

  return (
    <div className="flex items-center">
      {imagePreviewUrl && (
        <div className="mr-2 shrink-0">
          <img
            src={imagePreviewUrl}
            alt="Profile preview"
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
      )}
      <label
        htmlFor="profilePicture"
        className="cursor-pointer rounded-l-xl border border-blue-600 bg-blue-600 px-4 py-2 text-white"
      >
        Choose file
      </label>
      <div className="relative flex-1 rounded-r-xl border border-gray-300 px-4 py-2 text-gray-700">
        <span id="file-chosen">{selectedFileName}</span>
        <Controller
          control={control}
          name="profilePicture"
          render={({ field: { ref, onBlur } }) => (
            <input
              type="file"
              id="profilePicture"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              ref={ref}
              onBlur={onBlur}
              onChange={handleFileChange}
            />
          )}
        />
      </div>
    </div>
  );
};
