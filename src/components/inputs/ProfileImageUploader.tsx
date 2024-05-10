import type React from 'react';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { getBase64 } from '@/utils';

import type { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form';

interface ProfileImageUploaderProps<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  defaultImage?: string;
  fieldName: Path<T>;
}

export const ProfileImageUploader = <T extends FieldValues>({
  control,
  setValue,
  defaultImage,
  fieldName,
}: ProfileImageUploaderProps<T>) => {
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
      setValue(fieldName, file as T[typeof fieldName], { shouldValidate: true });

      setSelectedFileName(file.name);
      const base64 = await getBase64(file);
      setImagePreviewUrl(base64);
    } else {
      setValue(fieldName, null as T[typeof fieldName], { shouldValidate: true });
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
        htmlFor={String(fieldName)}
        className="cursor-pointer rounded-l-xl border border-blue-600 bg-blue-600 px-4 py-2 text-white"
      >
        Choose file
      </label>
      <div className="relative flex-1 rounded-r-xl border border-gray-300 px-4 py-2 text-gray-700">
        <span id="file-chosen">{selectedFileName}</span>
        <Controller
          control={control}
          name={fieldName}
          render={({ field: { ref, onBlur } }) => (
            <input
              type="file"
              id={String(fieldName)}
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
