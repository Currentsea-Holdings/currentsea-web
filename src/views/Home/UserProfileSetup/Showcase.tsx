import { CSButton } from '@/components';
import { useUserProfile } from '@/hooks/useUserProfile';
import { uploadShowCaseContent } from '@/services/userProfileService';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '@/styles/showcase-form.styles.css';
import { Upload } from 'flowbite-react-icons/outline';
import { UserProfileResponse, userProfileApi } from '@/api/userProfileApi';
import { API_ENDPOINTS, BASE_API_URL } from '@/utils/constants';
import trashcanIcon from '@/assets/trash.svg';
import { PuffLoader, PulseLoader } from 'react-spinners';

interface GetShowCaseContentResponse {
  showcaseContent: string[];
}

const Showcase = () => {
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
  } = useForm();

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    setUploadSuccess(filePreviews.length > 0);
  }, [filePreviews]);

  const fetchShowcaseContent = async () => {
    setIsDataLoading(true);
    try {
      if (!userProfile || !user) throw new Error('User profile is not available.');
      const content = (await userProfileApi.getShowCaseContent(
        userProfile.id,
      )) as GetShowCaseContentResponse;
      setFilePreviews(content.showcaseContent);
    } catch (error) {
      console.error('Error fetching user content:', error);
    }
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchShowcaseContent().catch((error: unknown) => {
      console.error('Error in fetchShowcaseContent:', error);
    });
  }, [user, userProfile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      const fileNamesArray = filesArray.map((file) => file.name);
      setSelectedFileNames([...selectedFileNames, ...fileNamesArray]);
      setUploadSuccess(false);
      setUploadError('');
    }
  };

  const handleDeleteFileName = (indexToDelete: number) => {
    const newSelectedFileNames = selectedFileNames.filter((_, index) => index !== indexToDelete);
    const newSelectedFiles = selectedFiles.filter((_, index) => index !== indexToDelete);

    setSelectedFileNames(newSelectedFileNames);
    setSelectedFiles(newSelectedFiles);
    setUploadSuccess(false);
  };

  const onUpload = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userProfile || !user) throw new Error('User profile is not available.');
    e.preventDefault();
    const formattedFormData = new FormData();
    let totalSize = 0;
    selectedFiles.forEach((file) => {
      totalSize += file.size;
    });
    // 30MB in bytes check
    if (totalSize > 30000000) {
      setUploadError('File too large. Please upload files up to 30MB.');
      return;
    }
    selectedFiles.forEach((file) => {
      formattedFormData.append('content', file);
    });

    formattedFormData.append('userId', userProfile.id);
    mutate(formattedFormData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: uploadShowCaseContent,
    onSuccess: () => {
      console.log('Profile updated successfully.');
      fetchShowcaseContent()
      .then(() => {
          setSelectedFiles([]);
          setSelectedFileNames([]);
          setUploadSuccess(true);
          setUploadError('');
        })
        .catch((error: unknown) => {
          console.error('An error occurred while fetching updated content:', error);
        });
    },
    onError: (error: Error) => {
      setUploadSuccess(false);
      setUploadError('An error occurred while uploading or file may still be too large.');
      console.error('Console: An error occurred while uploading:', error);
    },
  });

  const getFileType = (path: string): string => {
    const parts = path.split('.');
    const extension = parts.pop();

    if (!extension) {
      return 'unknown';
    }
    const lowerCaseExtension = extension.toLowerCase();
    if (['mp4', 'mov', 'webm', 'ogg', 'MOV'].includes(lowerCaseExtension)) {
      return 'video';
    } else if (['png', 'jpg', 'jpeg', 'gif'].includes(lowerCaseExtension)) {
      return 'image';
    }
    return 'unknown';
  };

  const deleteShowcaseContent = async (path: string) => {
    if (!userProfile || !user) {
      console.error('User profile is not available.');
      return;
    }

    try {
      await userProfileApi.deleteShowcaseContent(userProfile.id, path);
      setFilePreviews((prev) => prev.filter((url) => url !== path));
    } catch (error) {
      console.error('Error deleting showcase content:', error);
    }

    setFilePreviews((prev) => {
      const updatedPreviews = prev.filter((url) => url !== path);
      if (updatedPreviews.length === 0) {
        setUploadSuccess(false); // Set uploadSuccess to false if all files are deleted
      }
      return updatedPreviews;
    });
  };

  const skip = () => {
    nextStep();
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
      className="border-none"
    >
      <Modal.Header className="border-none">
        <div className="flex items-center justify-between">Showcase your best content...</div>
      </Modal.Header>
      <Modal.Body
        className="modal-body-custom border-none text-custom-blue"
        // style={{ height: '450px' }}
      >
        <div className="highlights-header">
          <b>Highlights</b>
        </div>
        <div className="file-previews-container">
          {isDataLoading ? (
            <div className="spinner-container">
              <PuffLoader
                color="#123abc"
                loading={isDataLoading}
                size={10}
              />
            </div>
          ) : (
            filePreviews.map((path, index) => {
              const fileType = getFileType(path);
              return (
                <div
                  key={index}
                  className="file-preview-item"
                >
                  {fileType === 'image' && (
                    <img
                      src={`${BASE_API_URL}${path}`}
                      alt={`Content ${index}`}
                    />
                  )}
                  {fileType === 'video' && (
                    <video
                      width="320"
                      height="240"
                      controls
                    >
                      <source
                        src={`${BASE_API_URL}${path}`}
                        type="video/mp4"
                      />
                      <source
                        src={`${BASE_API_URL}${path}`}
                        type="video/quicktime"
                      />
                      <track
                        src="captions_en.vtt"
                        kind="captions"
                        label="English"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteShowcaseContent(path)}
                  >
                    <img
                      id="trashcan-icon"
                      src={trashcanIcon}
                      alt="trash"
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <form
          onSubmit={onUpload}
          className="space-y-6"
        >
          <div>
            <div className="file-drop-area">
              <Upload />
              <span className="file-msg mt-2">
                <b>Click to upload </b>or drag and drop <br></br>Max file Size: 30MB
              </span>
              <input
                className="file-input"
                type="file"
                multiple
                onChange={handleFileSelect}
                accept="image/*, video/*"
                // {...register('content')}
              />
              <div className="file-names">
                {selectedFileNames.map((name, index) => (
                  <div
                    key={index}
                    className="file-name-item"
                  >
                    {name}
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteFileName(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 ? (
            <CSButton
              type="submit"
              disabled={!isValid || isPending}
              isProcessing={isPending}
              className="w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Upload
            </CSButton>
          ) : filePreviews.length > 0 ? (
            <CSButton
              onClick={nextStep}
              disabled={!isValid || isPending}
              isProcessing={isPending}
              className="w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Profile
            </CSButton>
          ) : (
            <CSButton
              disabled // You can decide what should happen if there are no files selected and no previews
              className="w-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Select Files
            </CSButton>
          )}
          <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
            {uploadError && <div style={{ color: 'red', marginBottom: '10px' }}>{uploadError}</div>}
          </div>
        </form>
        {!uploadSuccess && (
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px', cursor: 'pointer' }}>
            <button
              onClick={skip}
              style={{ fontSize: '12px', background: 'none' }}
            >
              Skip for now
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Showcase;
