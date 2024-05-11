import {
  createUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from '@/services/userProfileService';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

import type {
  CreateUserProfile,
  UpdateUserProfile,
  UploadProfilePicture,
} from '@/services/userProfileService';
import type { UserProfile } from '@/stores/authStore';

export const useManageUserProfile = () => {
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const { mutate: createUser, isPending: isCreating } = useMutation<
    UserProfile,
    Error,
    CreateUserProfile
  >({
    mutationFn: createUserProfile,
    onError: (error) => {
      console.error('Error creating user profile:', error.message);
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation<
    UserProfile,
    Error,
    UpdateUserProfile
  >({
    mutationFn: updateUserProfile,
    onError: (error) => {
      console.error('Error updating user profile:', error.message);
    },
  });

  const { mutate: uploadPicture, isPending: isUploading } = useMutation<
    UserProfile,
    Error,
    UploadProfilePicture
  >({
    mutationFn: uploadProfilePicture,
    onError: (error) => {
      console.error('Error uploading profile picture:', error.message);
    },
  });

  const handleProfileUpdate = (
    data: UserProfile,
    profilePicture?: File | null,
    onSuccess?: () => void,
  ) => {
    console.log('User Profile processed successfully.');
    setUserProfile(data);

    if (profilePicture) {
      uploadPicture(
        { id: data.id, profilePicture },
        {
          onSuccess: (updatedData) => {
            console.log('Profile picture uploaded successfully.');
            setUserProfile(updatedData);
            if (onSuccess) onSuccess();
          },
          onError: (error) => {
            console.error('Error uploading profile picture:', error.message);
          },
        },
      );
    } else {
      if (onSuccess) onSuccess();
    }
  };

  /**
   * Saves the user profile data and profile picture.
   *
   * @param data - The user profile data to be saved.
   * @param profilePicture - The profile picture file to be saved.
   * @param onSuccess - Optional callback function to be called on successful save.
   */
  const saveUserProfile = (
    data: CreateUserProfile | UpdateUserProfile,
    profilePicture?: File | null,
    onSuccess?: () => void,
  ) => {
    if ('userId' in data) {
      createUser(data as CreateUserProfile, {
        onSuccess: (profileData) => {
          handleProfileUpdate(profileData, profilePicture, onSuccess);
        },
      });
    } else {
      updateUser(data, {
        onSuccess: (profileData) => {
          handleProfileUpdate(profileData, profilePicture, onSuccess);
        },
      });
    }
  };

  return {
    saveUserProfile,
    isProcessing: isCreating || isUpdating || isUploading,
  };
};
